document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const uploadButton = document.getElementById('uploadButton');
    const previewSection = document.getElementById('previewSection');
    const uploadSection = document.getElementById('uploadSection');
    const downloadBtn = document.getElementById('downloadBtn');
    const changeImageBtn = document.getElementById('changeImageBtn');
    const placeholderImage = document.querySelector('.placeholder-image');
    const frameCircle = document.querySelector('.frame-circle');
    const cropModal = document.getElementById('cropModal');
    const cropImage = document.getElementById('cropImage');
    const zoomInButton = document.getElementById('zoomInButton');
    const zoomOutButton = document.getElementById('zoomOutButton');
    const rotateButton = document.getElementById('rotateButton');
    const applyCropButton = document.getElementById('applyCrop');
    const shareWhatsapp = document.getElementById('shareWhatsapp');
    const shareTwitter = document.getElementById('shareTwitter');
    const shareFacebook = document.getElementById('shareFacebook');
    
    let cropper = null;
    let currentImage = null;

    // Analytics helper function
    const trackEvent = (eventName, props = {}) => {
        if (window.plausible) {
            window.plausible(eventName, { props });
        }
    };

    // Handle click on upload button or frame circle
    uploadButton.addEventListener('click', () => {
        imageInput.click();
        trackEvent('upload_button_click');
    });

    frameCircle.addEventListener('click', () => {
        if (!currentImage) {
            imageInput.click();
            trackEvent('frame_circle_click');
        }
    });

    // Handle change image button
    changeImageBtn.addEventListener('click', () => {
        imageInput.click();
        trackEvent('change_image_click');
    });

    // Share buttons functionality
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent('أضف إطار علم فلسطين إلى صورتك الشخصية 🇵🇸');

    shareWhatsapp.addEventListener('click', () => {
        trackEvent('share', { platform: 'whatsapp' });
        window.open(`https://api.whatsapp.com/send?text=${shareText}%0A${shareUrl}`, '_blank');
    });

    shareTwitter.addEventListener('click', () => {
        trackEvent('share', { platform: 'twitter' });
        window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank');
    });

    shareFacebook.addEventListener('click', () => {
        trackEvent('share', { platform: 'facebook' });
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
    });

    // Handle file input change
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            trackEvent('image_selected', {
                fileType: file.type,
                fileSize: Math.round(file.size / 1024) // Size in KB
            });

            const reader = new FileReader();
            reader.onload = (e) => {
                cropImage.src = e.target.result;
                cropModal.style.display = 'block';
                
                // Destroy existing cropper if any
                if (cropper) {
                    cropper.destroy();
                }

                // Initialize Cropper.js
                cropper = new Cropper(cropImage, {
                    aspectRatio: 1,
                    viewMode: 1,
                    dragMode: 'move',
                    autoCropArea: 1,
                    cropBoxResizable: false,
                    cropBoxMovable: false,
                    guides: false,
                    center: true,
                    highlight: false,
                    background: false,
                    rotatable: true,
                    scalable: true,
                    zoomable: true,
                    minCropBoxWidth: 200,
                    minCropBoxHeight: 200
                });

                trackEvent('cropper_initialized');
            };
            reader.readAsDataURL(file);
        }
    });

    // Zoom controls
    let zoomCount = 0;
    zoomInButton.addEventListener('click', () => {
        cropper.zoom(0.1);
        zoomCount++;
        trackEvent('zoom', { direction: 'in', count: zoomCount });
    });

    zoomOutButton.addEventListener('click', () => {
        cropper.zoom(-0.1);
        zoomCount--;
        trackEvent('zoom', { direction: 'out', count: zoomCount });
    });

    // Rotate control
    let rotateCount = 0;
    rotateButton.addEventListener('click', () => {
        cropper.rotate(90);
        rotateCount++;
        trackEvent('rotate', { count: rotateCount });
    });

    // Apply crop
    applyCropButton.addEventListener('click', () => {
        trackEvent('crop_applied', {
            zoomLevel: zoomCount,
            rotations: rotateCount
        });

        const croppedCanvas = cropper.getCroppedCanvas({
            width: 1920,
            height: 1920,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
        });

        currentImage = new Image();
        currentImage.onload = () => {
            const previewImage = document.getElementById('previewImage') || document.createElement('img');
            previewImage.id = 'previewImage';
            previewImage.src = currentImage.src;
            if (!document.getElementById('previewImage')) {
                placeholderImage.parentNode.appendChild(previewImage);
            }
            placeholderImage.style.display = 'none';
            uploadSection.style.display = 'none';
            previewSection.style.display = 'block';
            cropModal.style.display = 'none';
            
            // Reset counters
            zoomCount = 0;
            rotateCount = 0;
            
            // Destroy cropper
            cropper.destroy();
            cropper = null;
        };
        currentImage.src = croppedCanvas.toDataURL('image/png', 1.0);
    });

    // Handle download button with high quality
    async function downloadImage() {
        trackEvent('download_started');

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas size to 1920x1920 for high quality while maintaining preview proportions
            const size = 1920;
            canvas.width = size;
            canvas.height = size;

            // Enable high-quality image rendering
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Fill black background
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, size, size);

            // Calculate dimensions to match preview exactly
            const innerRadius = size * 0.43; // Matches the preview's 60% mask
            const centerX = size / 2;
            const centerY = size / 2;

            // Draw the image in a circle with high quality
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
            ctx.clip();

            // Draw the image
            if (currentImage) {
                const scale = (innerRadius * 2) / Math.min(currentImage.naturalWidth, currentImage.naturalHeight);
                const scaledWidth = currentImage.naturalWidth * scale;
                const scaledHeight = currentImage.naturalHeight * scale;
                const x = centerX - scaledWidth/2;
                const y = centerY - scaledHeight/2;
                ctx.drawImage(currentImage, x, y, scaledWidth, scaledHeight);
            }
            ctx.restore();

            // Draw the Palestine flag frame exactly as in preview
            ctx.save();
            const outerRadius = size / 2;
            const gradient = ctx.createConicGradient(Math.PI * 1.278, centerX, centerY); // 230 degrees in radians
            
            // Match the preview's conic-gradient exactly
            gradient.addColorStop(0, '#000000');     // Red
            gradient.addColorStop(0.25, '#000000');
            gradient.addColorStop(0.25, '#ffffff');  // Black
            gradient.addColorStop(0.5, '#ffffff');
            gradient.addColorStop(0.5, '#009736');   // White
            gradient.addColorStop(0.75, '#009736');
            gradient.addColorStop(0.75, '#CE1126');  // Green
            gradient.addColorStop(1, '#CE1126');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
            ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
            
            // Convert to blob with high quality
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'صورة-مع-إطار-فلسطين.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                trackEvent('download_completed', {
                    fileSize: Math.round(blob.size / 1024) // Size in KB
                });
            }, 'image/png', 1.0);

        } catch (error) {
            console.error('Error downloading image:', error);
            alert('حدث خطأ أثناء تحميل الصورة. يرجى المحاولة مرة أخرى.');
        }
    }

    // Update the event listener for the download button
    downloadBtn.addEventListener('click', downloadImage);
}); 
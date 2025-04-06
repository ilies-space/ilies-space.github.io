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

    // Handle click on upload button or frame circle
    uploadButton.addEventListener('click', () => {
        imageInput.click();
    });

    frameCircle.addEventListener('click', () => {
        if (!currentImage) {
            imageInput.click();
        }
    });

    // Handle change image button
    changeImageBtn.addEventListener('click', () => {
        imageInput.click();
    });

    // Share buttons functionality
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent('أضف إطار علم فلسطين إلى صورتك الشخصية 🇵🇸');

    shareWhatsapp.addEventListener('click', () => {
        window.open(`https://api.whatsapp.com/send?text=${shareText}%0A${shareUrl}`, '_blank');
    });

    shareTwitter.addEventListener('click', () => {
        window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank');
    });

    shareFacebook.addEventListener('click', () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
    });

    // Handle file input change
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
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
            };
            reader.readAsDataURL(file);
        }
    });

    // Zoom controls
    zoomInButton.addEventListener('click', () => {
        cropper.zoom(0.1);
    });

    zoomOutButton.addEventListener('click', () => {
        cropper.zoom(-0.1);
    });

    // Rotate control
    rotateButton.addEventListener('click', () => {
        cropper.rotate(90);
    });

    // Apply crop
    applyCropButton.addEventListener('click', () => {
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
            
            // Destroy cropper
            cropper.destroy();
            cropper = null;
        };
        currentImage.src = croppedCanvas.toDataURL('image/png', 1.0);
    });

    // Handle download button with high quality
    downloadBtn.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to 1920x1920 for high quality
        const size = 1920;
        canvas.width = size;
        canvas.height = size;

        // Enable high-quality image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Fill black background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, size, size);

        // Calculate dimensions
        const frameThickness = size * 0.15;
        const innerRadius = size * 0.35;
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

        // Draw the Palestine flag frame
        ctx.save();
        const outerRadius = size / 2;
        const gradient = ctx.createConicGradient(0, centerX, centerY);
        
        gradient.addColorStop(0, '#CE1126');     // Red (right) 0-25%
        gradient.addColorStop(0.25, '#CE1126');
        gradient.addColorStop(0.25, '#000000');  // Black (top) 25-50%
        gradient.addColorStop(0.5, '#000000');
        gradient.addColorStop(0.5, '#FFFFFF');   // White (left) 50-75%
        gradient.addColorStop(0.75, '#FFFFFF');
        gradient.addColorStop(0.75, '#009736');  // Green (bottom) 75-100%
        gradient.addColorStop(1, '#009736');

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
        }, 'image/png', 1.0);
    });
}); 
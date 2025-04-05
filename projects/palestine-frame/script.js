document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const uploadButton = document.getElementById('uploadButton');
    const previewSection = document.getElementById('previewSection');
    const uploadSection = document.getElementById('uploadSection');
    const downloadBtn = document.getElementById('downloadBtn');
    const placeholderImage = document.querySelector('.placeholder-image');
    let currentImage = null;

    // Handle click on upload button
    uploadButton.addEventListener('click', () => {
        imageInput.click();
    });

    // Handle file input change
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    // Handle download button
    downloadBtn.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to exactly 320x320
        const size = 320;
        canvas.width = size;
        canvas.height = size;

        // Fill black background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, size, size);

        // Calculate dimensions
        const frameThickness = size * 0.125; // 40px for 320px size
        const innerRadius = size * 0.4; // Inner circle radius
        const centerX = size / 2;
        const centerY = size / 2;

        // Draw the image in a circle
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
        
        // Draw the colored sections
        const gradient = ctx.createConicGradient(0, centerX, centerY);
        
        // Add color stops for the flag sections (25% each)
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
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'صورة-مع-إطار-فلسطين.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 'image/png');
    });

    // Function to handle image upload
    function handleImageUpload(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                currentImage = img;
                const previewImage = document.getElementById('previewImage') || document.createElement('img');
                previewImage.id = 'previewImage';
                previewImage.src = e.target.result;
                if (!document.getElementById('previewImage')) {
                    placeholderImage.parentNode.appendChild(previewImage);
                }
                placeholderImage.style.display = 'none';
                uploadSection.style.display = 'none';
                previewSection.style.display = 'block';
            };
            img.src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    }
}); 
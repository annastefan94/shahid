document.addEventListener('DOMContentLoaded', () => {
    // Get modal elements
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-btn');

    // Function to populate an image grid
    function populateGrid(containerSelector, folderName, numberOfImages) {
        const gridContainer = document.querySelector(containerSelector);
        if (!gridContainer) {
            console.error(`Grid container not found: ${containerSelector}`);
            return;
        }

        gridContainer.innerHTML = ''; // Clear existing content

        for (let i = 1; i <= numberOfImages; i++) {
            const img = document.createElement('img');
            // Format number with leading zero (e.g., 01, 02)
            const imgFileName = `image_${i.toString().padStart(2, '0')}.jpg`;
            img.src = `images/${folderName}/${imgFileName}`;
            img.alt = `Momento do Shahid ${i}`; // Alt text for accessibility

            // Add click listener to open modal
            img.addEventListener('click', () => {
                modal.style.display = 'flex'; // Use flex to center the content
                modalImage.src = img.src;
            });

            gridContainer.appendChild(img);
        }
    }

    // Populate the 'meses' grid with 33 images (from image_01.jpg to image_33.jpg)
    populateGrid('.meses-grid', 'meses', 32);

    // Populate the 'aniversario' grid with 24 images (from image_01.jpg to image_24.jpg)
    populateGrid('.aniversario-grid', 'ano', 24);

    // When the user clicks on the close button (x), close the modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // When the user clicks anywhere outside of the modal content, close it
    modal.addEventListener('click', (event) => {
        if (event.target === modal) { // Check if the click was directly on the modal overlay
            modal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
});
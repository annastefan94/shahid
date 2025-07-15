document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const themeToggle = document.getElementById('theme-toggle');

    // --- State Variables ---
    const galleryData = {}; // Object to hold image sources for each gallery
    let currentImageList = [];
    let currentIndex = 0;
    let slideshowInterval = null;

    // --- Theme Toggler ---
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('light-theme');
    });

    // --- Core Functions ---

    /**
     * Populates an image grid and stores image data.
     */
    function populateGrid(containerSelector, folderName, start, end) {
        const gridContainer = document.querySelector(containerSelector);
        if (!gridContainer) return;

        const imageList = [];
        gridContainer.innerHTML = ''; // Clear existing content

        for (let i = start; i <= end; i++) {
            const imgFileName = `image_${i.toString().padStart(2, '0')}.jpg`;
            const imgSrc = `images/${folderName}/${imgFileName}`;
            imageList.push(imgSrc);

            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Momento do Shahid ${i}`;
            img.dataset.index = i - start; // 0-based index
            
            img.addEventListener('click', () => {
                openModal(imageList, parseInt(img.dataset.index));
            });

            gridContainer.appendChild(img);
        }
        galleryData[containerSelector] = imageList; // Store for slideshow use
    }

    /**
     * Opens the modal with a specific image from a gallery.
     * @param {string[]} imageList - The array of image sources.
     * @param {number} index - The index of the image to display.
     */
    function openModal(imageList, index) {
        stopSlideshow(); // Stop any running slideshow
        currentImageList = imageList;
        currentIndex = index;
        updateModalImage();
        modal.style.display = 'flex';
    }

    /**
     * Updates the modal's image source based on the current index.
     */
    function updateModalImage() {
        if (currentImageList.length > 0) {
            modalImage.src = currentImageList[currentIndex];
        }
    }

    function showNextImage() {
        stopSlideshow();
        currentIndex = (currentIndex + 1) % currentImageList.length;
        updateModalImage();
    }

    function showPrevImage() {
        stopSlideshow();
        currentIndex = (currentIndex - 1 + currentImageList.length) % currentImageList.length;
        updateModalImage();
    }

    function startSlideshow(gallerySelector) {
        const imageList = galleryData[gallerySelector];
        if (!imageList || imageList.length === 0) return;
        
        openModal(imageList, 0); // Open modal at the first image
        
        slideshowInterval = setInterval(() => {
            // This is the slideshow loop, we don't call showNextImage() to avoid clearing the interval
            currentIndex = (currentIndex + 1) % currentImageList.length;
            updateModalImage();
        }, 3000); // Change image every 3 seconds
    }

    function stopSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
        }
    }

    function closeModal() {
        stopSlideshow();
        modal.style.display = 'none';
    }

    // --- Initial Population ---
    populateGrid('.pre-natal-grid', 'pre', 1, 11);
    populateGrid('.celebracao-meses-grid', 'celebrate_month', 1, 8);
    populateGrid('.aniversario-grid', 'ano', 1, 23);
    populateGrid('.momentos-especiais-grid', 'diversos', 1, 14);

    // --- Event Listeners ---

    // Slideshow Buttons
    document.querySelectorAll('.slide-show-btn').forEach(button => {
        button.addEventListener('click', () => {
            const gallerySelector = button.dataset.gallery;
            startSlideshow(gallerySelector);
        });
    });

    // Modal Navigation
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Closing Modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'flex') {
            if (event.key === 'Escape') closeModal();
            if (event.key === 'ArrowRight') showNextImage();
            if (event.key === 'ArrowLeft') showPrevImage();
        }
    });

    // Swipe Navigation for Mobile
    let touchStartX = 0;
    modal.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (event) => {
        const touchEndX = event.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) { // Swiped left
            showNextImage();
        } else if (touchEndX > touchStartX + 50) { // Swiped right
            showPrevImage();
        }
    });
});
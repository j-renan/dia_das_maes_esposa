document.addEventListener('DOMContentLoaded', () => {
    // A variável photosList é carregada via script no index.html (arquivo photos.js)
    const imagesArray = photosList.map((photo, index) => ({
        src: `fotos/${photo}`,
        alt: `Lembrança ${index + 1}`
    }));

    const track = document.getElementById('carousel-track');
    const nav = document.getElementById('carousel-nav');

    // Generate slides and dots dynamically
    imagesArray.forEach((image, index) => {
        // Slide
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        if (index === 0) slide.classList.add('active');
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        slide.appendChild(img);
        track.appendChild(slide);

        // Dot
        const dot = document.createElement('button');
        dot.classList.add('nav-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Ir para a foto ${index + 1}`);
        nav.appendChild(dot);
    });

    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.nav-dot');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Function to update the active slide and dot
    const updateCarousel = (index) => {
        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel(currentSlide);
    };

    // Event Listeners for Buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Event Listeners for Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel(currentSlide);
            resetAutoPlay();
        });
    });

    // Auto Play Functionality
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change image every 5 seconds
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    };

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoPlay();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoPlay();
        }
    });

    // Start Autoplay on load
    startAutoPlay();
});

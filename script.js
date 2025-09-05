// Theme Management
let currentTheme = 'light';

// Gallery Management
let currentSlide = 0;
const totalSlides = 6;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadPreferences();
    applyTheme();
    initializeGallery();
    
    // Add smooth loading effect
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Theme Functions
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme();
    savePreferences();
    
    // Visual feedback
    const themeBtn = document.querySelector('.theme-toggle');
    themeBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        themeBtn.style.transform = '';
    }, 150);
}

function applyTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    body.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

function savePreferences() {
    localStorage.setItem('appPageTheme', currentTheme);
}

function loadPreferences() {
    const saved = localStorage.getItem('appPageTheme');
    if (saved) {
        currentTheme = saved;
    }
}

// Gallery Functions
function initializeGallery() {
    updateGallery();
    
    // Touch support for mobile
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    if (galleryWrapper) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        galleryWrapper.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        galleryWrapper.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                nextSlide(); // Swipe left
            }
            if (touchEndX > touchStartX + 50) {
                previousSlide(); // Swipe right
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            if (e.key === 'ArrowLeft') {
                nextSlide();
            } else {
                previousSlide();
            }
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateGallery();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateGallery();
}

function goToSlide(index) {
    currentSlide = index;
    updateGallery();
}

function updateGallery() {
    const galleryTrack = document.getElementById('galleryTrack');
    const indicators = document.querySelectorAll('.indicator');
    const screenshots = document.querySelectorAll('.screenshot-item');
    
    // Update track position
    if (galleryTrack) {
        const translateX = -currentSlide * 100;
        galleryTrack.style.transform = `translateX(${translateX}%)`;
    }
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
    
    // Update screenshots
    screenshots.forEach((screenshot, index) => {
        if (index === currentSlide) {
            screenshot.classList.add('active');
        } else {
            screenshot.classList.remove('active');
        }
    });
}

// Download tracking
function trackDownload(platform) {
    console.log(`Download clicked: ${platform}`);
    // Add analytics tracking here if needed
}

// Add download button listeners
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Track download
            if (this.classList.contains('app-store')) {
                trackDownload('app-store');
            } else if (this.classList.contains('google-play')) {
                trackDownload('google-play');
            } else if (this.classList.contains('apk-download')) {
                trackDownload('apk-direct');
            }
        });
    });
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.screenshot-item img');
    
    images.forEach((img, index) => {
        img.addEventListener('error', function() {
            console.error(`Failed to load image ${index + 1}:`, this.src);
            // Replace with placeholder
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.innerHTML = `<i class="fas fa-image"></i><br>الصورة ${index + 1}`;
            placeholder.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, var(--primary-container), var(--accent-color));
                color: var(--text-primary);
                font-size: 1.2rem;
                border-radius: 15px;
                opacity: 0.7;
            `;
            this.parentNode.appendChild(placeholder);
        });
        
        img.addEventListener('load', function() {
            console.log(`Image ${index + 1} loaded successfully`);
        });
    });
});

// Logo error handling
document.addEventListener('DOMContentLoaded', function() {
    const appLogo = document.getElementById('appLogo');
    
    if (appLogo) {
        appLogo.addEventListener('error', function() {
            const logoContainer = document.querySelector('.app-logo');
            logoContainer.innerHTML = '<i class="fas fa-mobile-alt" style="font-size: 60px; color: var(--accent-color);"></i>';
        });
    }
});

// Auto-play gallery (optional)
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 4000);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Auto-play controls
document.addEventListener('DOMContentLoaded', function() {
    const gallerySection = document.querySelector('.screenshots-section');
    
    if (gallerySection) {
        // Start auto-play
        startAutoPlay();
        
        // Pause on hover
        gallerySection.addEventListener('mouseenter', stopAutoPlay);
        gallerySection.addEventListener('mouseleave', startAutoPlay);
        
        // Pause on touch
        gallerySection.addEventListener('touchstart', stopAutoPlay);
        gallerySection.addEventListener('touchend', () => {
            setTimeout(startAutoPlay, 3000); // Resume after 3 seconds
        });
    }
});

// Smooth scrolling
document.documentElement.style.scrollBehavior = 'smooth';

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + T for theme toggle
    if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleTheme();
    }
});

// Performance optimization
window.addEventListener('load', function() {
    // Preload next/previous images
    const currentImages = document.querySelectorAll('.screenshot-item img');
    currentImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = img.src;
        document.head.appendChild(link);
    });
});

// Focus management for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation .download-btn:focus,
    .keyboard-navigation .theme-toggle:focus,
    .keyboard-navigation .gallery-nav:focus,
    .keyboard-navigation .indicator:focus {
        outline: 3px solid var(--accent-color);
        outline-offset: 2px;
        box-shadow: 0 0 0 6px rgba(49, 98, 141, 0.2);
    }
`;
document.head.appendChild(style);

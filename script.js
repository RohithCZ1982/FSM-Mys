// Navigation Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        // Only update active state for on-page anchor links
        if (link.getAttribute('href').startsWith('#')) {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        }
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animateElements = document.querySelectorAll('.feature-card, .pathway-card, .program-card, .community-image');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Get form data
        const formData = new FormData(contactForm);

        // Send to FormSubmit.co via Fetch
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                console.log('FormSubmit response status:', response.status);
                if (response.ok) {
                    // Hide form and show success message
                    contactForm.style.display = 'none';
                    const successMessage = document.getElementById('successMessage');
                    if (successMessage) {
                        successMessage.style.display = 'block';
                    }
                    contactForm.reset();
                } else {
                    console.error('FormSubmit error:', response);
                    alert('Oops! There was a problem submitting your form. Please try again.');
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Oops! There was a problem submitting your form. Please try again.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Add hover effect to images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('mouseenter', function () {
        this.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add floating animation to feature icons on hover
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        const icon = this.querySelector('.feature-icon');
        icon.style.transform = 'scale(1.2) rotate(5deg)';
    });

    card.addEventListener('mouseleave', function () {
        const icon = this.querySelector('.feature-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Preload critical images
window.addEventListener('load', () => {
    const criticalImages = [
        'images/hero-bg.jpg',
        'images/about.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

console.log('First Step Montessori - Website Loaded Successfully! 🎉');

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Show/Height button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Smooth scroll to top when clicked
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Rotating Text Animation
const rotatingTextElement = document.getElementById('heroRotatingText');
const rotatingTexts = [
    "<strong>Learning is</strong> a journey of academic acumen and self-discovery",
    "<strong>Learning is</strong> finding joy in every new discovery",
    "<strong>Learning is</strong> building confidence for a bright future",
    "<strong>Learning is</strong> growing together in a caring community",
    "<strong>Learning is</strong> exploring the world with wonder"
];

let currentTextIndex = 0;

function updateRotatingText() {
    if (!rotatingTextElement) return;

    // Fade out
    rotatingTextElement.style.opacity = '0';
    rotatingTextElement.style.transform = 'translateY(20px)';

    setTimeout(() => {
        // Change text
        rotatingTextElement.innerHTML = rotatingTexts[currentTextIndex];

        // Fade in
        rotatingTextElement.style.opacity = '1';
        rotatingTextElement.style.transform = 'translateY(0)';

        // Update index for next loop
        currentTextIndex = (currentTextIndex + 1) % rotatingTexts.length;
    }, 1000); // Wait for transition
}

if (rotatingTextElement) {
    // Initial call
    updateRotatingText();
    // Interval
    setInterval(updateRotatingText, 5000);
}

// Optimization: Pause video when not in view
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.playbackRate = 0.8; // Slow down video for better visual appeal
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroVideo.play().catch(e => console.log("Video play failed:", e));
            } else {
                heroVideo.pause();
            }
        });
    }, { threshold: 0.5 }); // 50% visibility threshold

    videoObserver.observe(heroVideo);
}


// ===== Lightbox Functionality =====
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const caption = document.getElementById('caption');

    // Event Delegation for Gallery Items (since they are dynamic)
    const galleryGridLightbox = document.getElementById('gallery-grid');
    if (galleryGridLightbox) {
        galleryGridLightbox.addEventListener('click', function (e) {
            const item = e.target.closest('.gallery-item');
            if (item) {
                const img = item.querySelector('img');
                if (img) {
                    lightbox.style.display = 'flex';
                    lightboxImg.src = img.src;
                    if (caption) {
                        caption.textContent = img.alt || 'Gallery Image';
                    }
                }
            }
        });
    }

    // Close function
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display !== 'none') {
            closeLightbox();
        }
    });
}

// ===== Dynamic Gallery Loading & Filtering =====
const filterButtons = document.querySelectorAll('.filter-btn');

// List of all images in the gallery folder
// In a real backend environment, this would be fetched from an API.
// For this static site, we maintain the list manually based on the file system.
const galleryImages = [
    { src: 'images/gallery/classroomImage1.jpg', category: 'classroom', alt: 'Classroom Activity 1' },
    { src: 'images/gallery/classroomImage2.jpg', category: 'classroom', alt: 'Classroom Activity 2' },
    { src: 'images/gallery/classroomImage3.jpg', category: 'classroom', alt: 'Classroom Activity 3' },
    { src: 'images/gallery/outdoorImage1.jpg', category: 'outdoor', alt: 'Outdoor Fun 1' },
    { src: 'images/gallery/outdoorImage2.jpg', category: 'outdoor', alt: 'Outdoor Fun 2' },
    { src: 'images/gallery/outdoorImage3.jpg', category: 'outdoor', alt: 'Outdoor Fun 3' },
    { src: 'images/gallery/artsImage1.jpg', category: 'arts', alt: 'Creative Arts 1' },
    { src: 'images/gallery/artsImage2.jpg', category: 'arts', alt: 'Creative Arts 2' },
    { src: 'images/gallery/artsImage3.jpg', category: 'arts', alt: 'Creative Arts 3' },
    { src: 'images/gallery/activitiesImage1.jpg', category: 'activities', alt: 'Group Activity 1' },
    { src: 'images/gallery/activitiesImage2.jpg', category: 'activities', alt: 'Group Activity 2' },
    { src: 'images/gallery/activitiesImage3.jpg', category: 'activities', alt: 'Group Activity 3' }
];

function renderGallery(filterIndex) {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = ''; // Clear current images

    const filterPrefix = filterIndex === 'all' ? null : filterIndex;

    const filteredImages = galleryImages.filter(img => {
        if (filterIndex === 'all') return true;
        // Check if the image source filename starts with the prefix (e.g. 'classroom')
        const filename = img.src.split('/').pop();
        return filename.startsWith(filterPrefix);
    });

    filteredImages.forEach(img => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-category', img.category);

        // Add animation for reappearing items
        item.style.animation = 'fadeIn 0.5s ease forwards';

        item.innerHTML = `
            <div class="gallery-image">
                <img src="${img.src}" alt="${img.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        `;
        galleryGrid.appendChild(item);
    });
}

// Initial Load
if (document.getElementById('gallery-grid')) {
    renderGallery('all');
}

// Filter Button Click Handlers
if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            // If data-category-prefix is present use it, otherwise fallback to data-filter
            const prefix = btn.getAttribute('data-category-prefix') || filterValue;

            renderGallery(prefix);
        });
    });
}

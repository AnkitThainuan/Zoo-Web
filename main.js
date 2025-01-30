// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scroll behavior
    initSmoothScroll();
    
    // Initialize animations
    initAnimations();
    
    // Initialize parallax effects
    initParallax();
    
    // Initialize scroll-based navigation
    initNavigation();
    
    // Initialize custom cursor and interaction effects
    initCustomCursor();
    initHoverEffects();
    initParallaxEffects();
    
    // Initialize dark mode
    initDarkMode();
});

function initSmoothScroll() {
    // Smooth scroll to sections when clicking nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initAnimations() {
    // Fade in elements as they come into view
    const fadeElements = document.querySelectorAll('.collection-item, .feature, h1, h2, .subtitle');
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top bottom-=100",
                toggleClass: "visible",
                once: true
            }
        });
    });

    // Animate hero section
    gsap.from('#hero .content-wrapper', {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "power3.out"
    });

    // Animate collection items
    gsap.utils.toArray('.collection-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            delay: i * 0.2
        });
    });
}

function initParallax() {
    // Create parallax effect for sections
    gsap.utils.toArray('.section').forEach(section => {
        const bg = section.querySelector('.content-wrapper');
        
        gsap.to(bg, {
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: 100,
            ease: "none"
        });
    });
}

function initNavigation() {
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;

    // Handle navigation visibility on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down & past the threshold
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Update active navigation based on scroll position
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Custom cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
}

// Hover effects
function initHoverEffects() {
    const hoverElements = document.querySelectorAll('a, button, .gallery-item, .luxury-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.querySelector('.cursor').classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            document.querySelector('.cursor').classList.remove('hover');
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-background');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });
}

// Dark Mode Functionality
function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(themeIcon, savedTheme);
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeIcon, newTheme);
        
        // Add animation effect
        themeToggle.style.transform = 'scale(1.2)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 200);
    });
}

function updateThemeIcon(icon, theme) {
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothNavigation();
});

function initScrollAnimations() {
    // Animate text elements
    gsap.utils.toArray('.bloom-text').forEach(text => {
        gsap.from(text, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: text,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate items with stagger
    const sections = gsap.utils.toArray('.section');
    sections.forEach(section => {
        const items = section.querySelectorAll('.bloom-item');
        if (items.length) {
            gsap.from(items, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: section,
                    start: "top center+=100",
                    toggleActions: "play none none reverse"
                }
            });
        }
    });

    // Parallax images
    gsap.utils.toArray('.luxury-image, .gallery-item').forEach(image => {
        gsap.to(image.querySelector('img'), {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Fade in section content
    sections.forEach(section => {
        const content = section.querySelector('.content-wrapper');
        if (content) {
            gsap.from(content, {
                y: 30,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top center+=100",
                    toggleActions: "play none none reverse"
                }
            });
        }
    });
}

function initSmoothNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetPosition,
                        autoKill: false
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
}

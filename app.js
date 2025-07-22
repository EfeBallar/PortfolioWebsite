// Landing screen animation and main functionality
document.addEventListener('DOMContentLoaded', function() {
    const landingScreen = document.getElementById('landing-screen');
    const mainContent = document.getElementById('main-content');
    const greetingText = document.getElementById('greeting-text');
    
    // Array of greetings in different languages (excluding English for the cycle)
    const greetings = [
        'Ciao!',      // Italian
        'Hola!',      // Spanish
        'Bonjour!',   // French
        'Hallo!',     // German
        'Hoi!',       // Dutch
        'Merhaba!',   // Turkish
    ];
    
    let currentGreeting = 0;
    let hasCompletedCycle = false;
    
    // Function to cycle through greetings
    function cycleGreetings() {
        if (currentGreeting >= greetings.length) {
            // Completed one cycle through all languages
            hasCompletedCycle = true;
            return;
        }
        
        greetingText.style.opacity = '0';
        setTimeout(() => {
            greetingText.textContent = greetings[currentGreeting];
            greetingText.style.opacity = '1';
            currentGreeting++;
        }, 100);
    }
    
    // Start cycling through greetings
    const greetingInterval = setInterval(() => {
        if (!hasCompletedCycle) {
            cycleGreetings();
        } else {
            clearInterval(greetingInterval);
            // End with English after completing the cycle
            setTimeout(() => {
                greetingText.style.opacity = '0';
                setTimeout(() => {
                    greetingText.textContent = 'Hey!';
                    greetingText.style.opacity = '1';
                    
                    // Start the slide-up animation after showing English
                    setTimeout(() => {
                        landingScreen.classList.add('slide-up');
                        
                        // Show main content after landing screen slides up
                        setTimeout(() => {
                            mainContent.classList.add('visible');
                            landingScreen.style.display = 'none';
                            
                            // Scroll directly to About Me section
                            setTimeout(() => {
                                const aboutSection = document.querySelector('#about');
                                if (aboutSection) {
                                    aboutSection.scrollIntoView({ 
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }
                            }, 100);
                            
                            // Initialize all other animations and features
                            initializeAnimations();
                            initializeParticles();
                            initializeFunFacts();
                            initializeScrollAnimations();
                            initializeNavigation();
                        }, 1500);
                    }, 500);
                }, 100);
            }, 200);
        }
    }, 150);
});

// Fun facts rotation in about section
function initializeFunFacts() {
    const funFacts = document.querySelectorAll('.fun-fact');
    let currentFact = 0;
    
    function rotateFacts() {
        // Remove active class from all facts
        funFacts.forEach(fact => fact.classList.remove('active'));
        
        // Add active class to current fact
        if (funFacts[currentFact]) {
            funFacts[currentFact].classList.add('active');
        }
        
        // Move to next fact
        currentFact = (currentFact + 1) % funFacts.length;
    }
    
    // Start with first fact active
    if (funFacts.length > 0) {
        funFacts[0].classList.add('active');
        // Rotate every 3 seconds
        setInterval(rotateFacts, 3000);
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('timeline-item')) {
                    const items = document.querySelectorAll('.timeline-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 200);
                    });
                }
                
                if (entry.target.classList.contains('skill-item')) {
                    const skills = entry.target.parentElement.querySelectorAll('.skill-item');
                    skills.forEach((skill, index) => {
                        setTimeout(() => {
                            skill.style.transform = 'translateY(0)';
                            skill.style.opacity = '1';
                        }, index * 100);
                    });
                }
                
                if (entry.target.classList.contains('project-card')) {
                    const cards = document.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.transform = 'translateY(0)';
                            card.style.opacity = '1';
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.timeline-item, .skill-item, .project-card, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Set initial styles for timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
    });
    
    // Set initial styles for skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
    });
    
    // Set initial styles for project cards
    document.querySelectorAll('.project-card').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
    });
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Change navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active navigation link
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize other interactive features
function initializeAnimations() {
    // Skill items hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Project cards interaction
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
            const message = contactForm.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1000);
        });
    }
    
    // Download resume button
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a simple notification
            const notification = document.createElement('div');
            notification.textContent = 'Resume download started!';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #10b981;
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
            
            // In a real application, you would trigger the actual download here
            // window.open('path-to-your-resume.pdf', '_blank');
        });
    }
    
    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });
}

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: #6366f1 !important;
        font-weight: 600;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Prevent scrolling during landing animation
document.body.style.overflow = 'hidden';
setTimeout(() => {
    document.body.style.overflow = 'auto';
}, 4000); // Re-enable scrolling after landing animation completes

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Your scroll handling code here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Enhance tab navigation visibility
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #6366f1 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyle);

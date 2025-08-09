// Enhanced Portfolio JavaScript with Animations and Effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and effects
    initParticles();
    initScrollAnimations();
    initLoadingScreen();
    initInteractiveEffects();
    initTypingEffect();
});

// Particle Background System
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    container.appendChild(particle);
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections with animation class
    document.querySelectorAll('.section-animate').forEach(section => {
        observer.observe(section);
    });
}

// Loading screen animation
function initLoadingScreen() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // Hide loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 1000);
        }, 1500);
    });
}

// Interactive hover effects and animations
function initInteractiveEffects() {
    // Enhanced 3D card effects
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(10deg) rotateY(10deg) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
        
        // Mouse move parallax effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
    });
    
    // Skill tags interactive effects
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to CSS
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Typing effect for the name
function initTypingEffect() {
    const nameElement = document.querySelector('.name-title');
    if (!nameElement) return;
    
    const originalText = nameElement.innerHTML;
    const iconMatch = originalText.match(/<i[^>]*><\/i>/);
    const icon = iconMatch ? iconMatch[0] : '';
    const textOnly = originalText.replace(/<i[^>]*><\/i>/, '').trim();
    
    nameElement.innerHTML = icon;
    
    let i = 0;
    const typeWriter = () => {
        if (i < textOnly.length) {
            nameElement.innerHTML = icon + textOnly.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 2000);
}

// Smooth scrolling for any internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add mouse cursor trail effect
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', function(e) {
    mouseTrail.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now()
    });
    
    // Remove old trail points
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
    
    // Limit trail length
    if (mouseTrail.length > maxTrailLength) {
        mouseTrail = mouseTrail.slice(-maxTrailLength);
    }
});

// Performance optimization: Throttle scroll events
let ticking = false;

function updateScrollEffects() {
    // Add any scroll-based effects here
    ticking = false;
}

document.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Add dynamic gradient background color changes
function initDynamicBackground() {
    const colors = [
        ['#f5f5dc', '#2c1810', '#4a148c', '#1a0a2e'], // beige, dark brown, purple, dark purple
        ['#e6ddd4', '#1a1a1a', '#6a1b9a', '#2e0854'], // light beige, black, medium purple, deep purple
        ['#d4c5b9', '#0d0d0d', '#8e24aa', '#4a148c'], // warm beige, near black, bright purple, royal purple
        ['#f0e6d2', '#333333', '#7b1fa2', '#1a0a2e']  // cream beige, dark gray, violet, midnight purple
    ];
    
    let currentColorSet = 0;
    
    setInterval(() => {
        currentColorSet = (currentColorSet + 1) % colors.length;
        const newColors = colors[currentColorSet];
        
        document.body.style.background = `linear-gradient(-45deg, ${newColors.join(', ')})`;
        document.body.style.backgroundSize = '400% 400%';
    }, 10000); // Change colors every 10 seconds
}

// Initialize dynamic background
setTimeout(initDynamicBackground, 3000);
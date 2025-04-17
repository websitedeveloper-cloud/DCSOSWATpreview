// Smooth scrolling for internal links with error handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to Top Button functionality with accessibility
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.textContent = '↑';
scrollToTopBtn.classList.add('scroll-to-top');
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollToTopBtn.setAttribute('role', 'button');
scrollToTopBtn.style.display = 'none'; // Start hidden
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Debounced scroll event handler
let scrollTimeout;
const SCROLL_THRESHOLD = 500;
const DEBOUNCE_DELAY = 100;

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (window.scrollY > SCROLL_THRESHOLD) {
            scrollToTopBtn.style.display = 'flex';
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.style.display = 'none';
            scrollToTopBtn.classList.remove('visible');
        }
    }, DEBOUNCE_DELAY);
});

// FAQ Section Toggle Functionality with accessibility
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    // Set initial ARIA attributes
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('aria-controls', answer.id || `faq-answer-${Math.random().toString(36).substr(2, 9)}`);
    answer.setAttribute('id', question.getAttribute('aria-controls'));
    
    question.addEventListener('click', () => {
        const isVisible = answer.style.display === 'block';
        answer.style.display = isVisible ? 'none' : 'block';
        question.setAttribute('aria-expanded', !isVisible);
    });
});

// Highlight navigation links based on scroll position with Intersection Observer
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    rootMargin: '-200px 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentSection = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Cleanup function for event listeners
const cleanup = () => {
    window.removeEventListener('scroll', scrollToTopBtn);
    sections.forEach(section => observer.unobserve(section));
    observer.disconnect();
};

// Add cleanup on page unload
window.addEventListener('unload', cleanup);
  
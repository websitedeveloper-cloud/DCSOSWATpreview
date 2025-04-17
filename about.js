// Add any future JavaScript functionality here
document.addEventListener('DOMContentLoaded', function() {
  // Navigation functionality
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');
    });
  });

  // Smooth scroll for section links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // Add animation to sections when they come into view
  const sections = document.querySelectorAll('main section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Add hover effect to grid items
  const gridItems = document.querySelectorAll('.value-item, .team-item, .capability-item, .training-item, .engagement-item, .partner-item');
  gridItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Update active navigation link based on scroll position
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav a');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const scrollPosition = window.scrollY;
      
      if (scrollPosition >= sectionTop - 100 && 
          scrollPosition < sectionTop + sectionHeight - 100) {
        const currentId = '#' + section.id;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === currentId) {
            link.classList.add('active');
          }
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
      scrollToTopBtn.style.display = window.scrollY > SCROLL_THRESHOLD ? 'block' : 'none';
    }, DEBOUNCE_DELAY);
  });

  // Cleanup function for event listeners
  const cleanup = () => {
    window.removeEventListener('scroll', scrollToTopBtn);
    sections.forEach(section => observer.unobserve(section));
    observer.disconnect();
  };

  // Add cleanup on page unload
  window.addEventListener('unload', cleanup);
}); 

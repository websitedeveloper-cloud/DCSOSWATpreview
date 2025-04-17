document.addEventListener('DOMContentLoaded', function() {
    // Initialize training cards
    const trainingCards = document.querySelectorAll('.training-card');
    const scheduleCards = document.querySelectorAll('.schedule-card');
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    const registerButtons = document.querySelectorAll('.register');

    // Add hover effect to training cards
    trainingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });

    // Add hover effect to schedule cards
    scheduleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });

    // Handle Learn More button clicks
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.training-card');
            const title = card.querySelector('h3').textContent;
            
            // Create modal content
            const modalContent = `
                <div class="modal">
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <h2>${title} Training Details</h2>
                        <p>This is a detailed description of the ${title} training program. 
                        The program includes comprehensive instruction and practical exercises 
                        designed to prepare officers for real-world scenarios.</p>
                        <button class="register">Register Now</button>
                    </div>
                </div>
            `;

            // Add modal to body
            document.body.insertAdjacentHTML('beforeend', modalContent);
            
            // Add modal styles
            const style = document.createElement('style');
            style.textContent = `
                .modal {
                    display: flex;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                    justify-content: center;
                    align-items: center;
                }
                .modal-content {
                    background-color: var(--white);
                    padding: var(--spacing-lg);
                    border-radius: var(--border-radius);
                    max-width: 600px;
                    width: 90%;
                    position: relative;
                }
                .close-modal {
                    position: absolute;
                    right: var(--spacing-md);
                    top: var(--spacing-sm);
                    font-size: 1.5rem;
                    cursor: pointer;
                }
            `;
            document.head.appendChild(style);

            // Handle modal close
            const modal = document.querySelector('.modal');
            const closeModal = document.querySelector('.close-modal');
            
            closeModal.addEventListener('click', function() {
                modal.remove();
                style.remove();
            });

            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                    style.remove();
                }
            });
        });
    });

    // Handle Register button clicks
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.schedule-card');
            const title = card.querySelector('h3').textContent;
            
            // Create registration form
            const formContent = `
                <div class="modal">
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <h2>Register for ${title}</h2>
                        <form id="registration-form">
                            <div class="form-group">
                                <label for="name">Full Name</label>
                                <input type="text" id="name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number</label>
                                <input type="tel" id="phone" required>
                            </div>
                            <div class="form-group">
                                <label for="department">Department</label>
                                <input type="text" id="department" required>
                            </div>
                            <button type="submit" class="submit-btn">Submit Registration</button>
                        </form>
                    </div>
                </div>
            `;

            // Add modal to body
            document.body.insertAdjacentHTML('beforeend', formContent);
            
            // Add modal and form styles
            const style = document.createElement('style');
            style.textContent = `
                .modal {
                    display: flex;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                    justify-content: center;
                    align-items: center;
                }
                .modal-content {
                    background-color: var(--white);
                    padding: var(--spacing-lg);
                    border-radius: var(--border-radius);
                    max-width: 500px;
                    width: 90%;
                    position: relative;
                }
                .close-modal {
                    position: absolute;
                    right: var(--spacing-md);
                    top: var(--spacing-sm);
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                .form-group {
                    margin-bottom: var(--spacing-md);
                }
                .form-group label {
                    display: block;
                    margin-bottom: var(--spacing-xs);
                    color: var(--text-color);
                }
                .form-group input {
                    width: 100%;
                    padding: var(--spacing-sm);
                    border: 1px solid var(--primary-lighter);
                    border-radius: var(--border-radius);
                }
                .submit-btn {
                    background-color: var(--primary-color);
                    color: var(--white);
                    border: none;
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--border-radius);
                    cursor: pointer;
                    width: 100%;
                    margin-top: var(--spacing-md);
                }
                .submit-btn:hover {
                    background-color: var(--primary-hover);
                }
            `;
            document.head.appendChild(style);

            // Handle form submission
            const form = document.getElementById('registration-form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Registration submitted successfully! We will contact you shortly.');
                document.querySelector('.modal').remove();
                style.remove();
            });

            // Handle modal close
            const modal = document.querySelector('.modal');
            const closeModal = document.querySelector('.close-modal');
            
            closeModal.addEventListener('click', function() {
                modal.remove();
                style.remove();
            });

            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                    style.remove();
                }
            });
        });
    });

    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.training-card, .schedule-card');
    
    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}); 
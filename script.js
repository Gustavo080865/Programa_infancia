document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Remove active class from all and add to clicked one
            document.querySelectorAll('nav a').forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Function for CTA button to scroll
    window.scrollToSection = function(sectionId) {
        document.getElementById(sectionId).scrollIntoView({
            behavior: 'smooth'
        });
        // Set active class on corresponding nav item
        document.querySelectorAll('nav a').forEach(item => item.classList.remove('active'));
        document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
    };

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Adjust this value as needed for when a section is considered "active"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Toggle Quiz Answers
    document.querySelectorAll('.toggle-answers-button').forEach(button => {
        button.addEventListener('click', function() {
            const quizId = this.dataset.quizId;
            const answersDiv = document.getElementById(`${quizId}-answers`);
            if (answersDiv.style.display === 'block') {
                answersDiv.style.display = 'none';
                this.textContent = 'Ver Reflexión';
            } else {
                answersDiv.style.display = 'block';
                this.textContent = 'Ocultar Reflexión';
            }
        });
    });

    // Modals functionality
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.close-button');
    const modals = document.querySelectorAll('.modal');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.dataset.modalId;
            document.getElementById(modalId).style.display = 'flex'; // Use flex to center
            document.body.style.overflow = 'hidden'; // Prevent scrolling on body
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    });

    // Close modal when clicking outside of it
    modals.forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
});

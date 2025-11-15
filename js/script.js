/* ============================================
   CLIL for Veterinarians - Main JavaScript
   ============================================ */

// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    if (navMenu) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });

    // ===== Accordion Functionality =====
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', function() {
                accordion.classList.toggle('active');
            });
        }
    });

    // ===== Tab Navigation =====
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabContainer = this.closest('.tabs');
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabContainer.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            tabContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = tabContainer.querySelector(`.tab-content[data-tab="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ===== Contact Form Validation =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const successMessage = document.querySelector('.form-success');
            
            let isValid = true;
            
            // Reset previous errors
            document.querySelectorAll('.form-error').forEach(error => {
                error.classList.remove('show');
            });
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate subject
            if (!subject.value.trim()) {
                showError(subject, 'Subject is required');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                if (successMessage) {
                    successMessage.classList.add('show');
                    contactForm.reset();
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 5000);
                }
            }
        });
    }
    
    function showError(input, message) {
        const errorElement = input.parentElement.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    // ===== Glossary Search =====
    const glossarySearch = document.getElementById('glossarySearch');
    if (glossarySearch) {
        glossarySearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const terms = document.querySelectorAll('.glossary-term');
            
            terms.forEach(term => {
                const termText = term.textContent.toLowerCase();
                if (termText.includes(searchTerm)) {
                    term.style.display = 'block';
                } else {
                    term.style.display = 'none';
                }
            });
        });
    }

    // ===== Alphabet Navigation =====
    const alphabetButtons = document.querySelectorAll('.alphabet-btn');
    alphabetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const letter = this.textContent.toLowerCase();
            const terms = document.querySelectorAll('.glossary-term');
            
            // Remove active class from all buttons
            alphabetButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter terms
            terms.forEach(term => {
                const termTitle = term.querySelector('h3').textContent.toLowerCase();
                if (termTitle.startsWith(letter)) {
                    term.style.display = 'block';
                } else {
                    term.style.display = 'none';
                }
            });
            
            // Clear search if active
            if (glossarySearch) {
                glossarySearch.value = '';
            }
        });
    });

    // ===== Quiz Functionality =====
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const question = this.closest('.quiz-question');
            const allOptions = question.querySelectorAll('.quiz-option');
            
            // Remove selected class from all options in this question
            allOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });

    // Submit quiz
    const submitQuiz = document.getElementById('submitQuiz');
    if (submitQuiz) {
        submitQuiz.addEventListener('click', function() {
            const questions = document.querySelectorAll('.quiz-question');
            let correctAnswers = 0;
            let totalQuestions = questions.length;
            
            questions.forEach((question, index) => {
                const selectedOption = question.querySelector('.quiz-option.selected');
                const correctAnswer = question.getAttribute('data-correct');
                
                if (selectedOption) {
                    const optionIndex = Array.from(question.querySelectorAll('.quiz-option')).indexOf(selectedOption);
                    
                    if (optionIndex.toString() === correctAnswer) {
                        selectedOption.classList.add('correct');
                        correctAnswers++;
                    } else {
                        selectedOption.classList.add('incorrect');
                        // Highlight correct answer
                        const correctOption = question.querySelectorAll('.quiz-option')[correctAnswer];
                        if (correctOption) {
                            correctOption.classList.add('correct');
                        }
                    }
                }
            });
            
            // Show result
            const resultDiv = document.getElementById('quizResult');
            if (resultDiv) {
                resultDiv.classList.add('show');
                const percentage = (correctAnswers / totalQuestions) * 100;
                resultDiv.innerHTML = `
                    <h3>Quiz Results</h3>
                    <p>You scored ${correctAnswers} out of ${totalQuestions} (${percentage.toFixed(0)}%)</p>
                `;
                resultDiv.className = `quiz-result show ${percentage >= 70 ? 'success' : 'error'}`;
            }
        });
    }

    // ===== Image Gallery Modal =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openModal(img.src, img.alt);
            }
        });
    });

    function openModal(imageSrc, imageAlt) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${imageSrc}" alt="${imageAlt}" style="width: 100%; display: block;">
            </div>
        `;
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // ===== Back to Top Button =====
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Scroll Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animation
    document.querySelectorAll('.card, .section-title, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // ===== Lazy Loading Images =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});



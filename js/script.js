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

    // ===== Glossary Data Handling =====
    const glossaryGrid = document.getElementById('glossaryGrid');
    const glossaryStatus = document.getElementById('glossaryStatus');
    const glossarySearch = document.getElementById('glossarySearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const alphabetButtons = document.querySelectorAll('.alphabet-btn');

    const glossaryState = {
        data: [],
        filters: {
            search: '',
            category: 'all',
            letter: 'all'
        }
    };

    const fallbackGlossary = [
        { term: 'Abdominal', definition: 'Relating to the abdomen, the part of the body between the chest and pelvis.', translation: 'Qorin bo\'shlig\'iga oid, ko\'krak va tos o\'rtasidagi qism.', category: 'Anatomy', letter: 'A' },
        { term: 'Abscess', definition: 'A localized collection of pus in tissues, organs, or confined spaces.', translation: 'To\'qimalar yoki organlarda yiring to\'planishi.', category: 'Disease', letter: 'A' },
        { term: 'Anesthesia', definition: 'Loss of sensation, especially pain, induced by drugs.', translation: 'Dori ta’sirida sezgi, ayniqsa og\'riqning yo\'qolishi.', category: 'Treatment', letter: 'A' },
        { term: 'Antibiotic', definition: 'A medicine that inhibits the growth of or destroys microorganisms.', translation: 'Mikroorganizmlarni o\'ldiradigan yoki o\'sishini to\'xtatadigan dori.', category: 'Treatment', letter: 'A' },
        { term: 'Bacteria', definition: 'Microscopic single-celled organisms, some of which can cause disease.', translation: 'Ba\'zilari kasallik keltiradigan mikroskopik bir hujayrali organizmlar.', category: 'Microbiology', letter: 'B' },
        { term: 'Biopsy', definition: 'Removal and examination of tissue from the living body for diagnosis.', translation: 'Tirik to\'qimani olib tashlab tekshirish jarayoni.', category: 'Diagnosis', letter: 'B' },
        { term: 'Castration', definition: 'Surgical removal of the testicles in male animals.', translation: 'Erkak hayvonlarda urug\'donlarni jarrohlik yo\'li bilan olib tashlash.', category: 'Surgery', letter: 'C' },
        { term: 'Dehydration', definition: 'Condition in which the body loses more water than it takes in.', translation: 'Organizm qabul qilganidan ko\'proq suyuqlik yo\'qotishi.', category: 'Disease', letter: 'D' },
        { term: 'Euthanasia', definition: 'Painless killing of an animal suffering from an incurable disease.', translation: 'Davolanmaydigan kasallikdan azob chekuvchi hayvonni og\'riqsiz o\'ldirish.', category: 'Treatment', letter: 'E' },
        { term: 'Fracture', definition: 'A break or crack in a bone.', translation: 'Suyakdagi sinish yoki yoriq.', category: 'Injury', letter: 'F' }
    ];

    if (glossaryGrid) {
        loadGlossaryData();

        if (glossarySearch) {
            glossarySearch.addEventListener('input', (event) => {
                glossaryState.filters.search = event.target.value.toLowerCase();
                applyGlossaryFilters();
            });
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (event) => {
                glossaryState.filters.category = event.target.value;
                applyGlossaryFilters();
            });
        }

        alphabetButtons.forEach(button => {
            button.addEventListener('click', function() {
                const letter = this.dataset.letter.toLowerCase();
                if (glossaryState.filters.letter === letter) {
                    glossaryState.filters.letter = 'all';
                    this.classList.remove('active');
                } else {
                    glossaryState.filters.letter = letter;
                    alphabetButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                }

                if (glossarySearch) {
                    glossarySearch.value = '';
                    glossaryState.filters.search = '';
                }

                applyGlossaryFilters();
            });
        });

        glossaryGrid.addEventListener('click', (event) => {
            const pronounceBtn = event.target.closest('.pronunciation-btn');
            if (pronounceBtn) {
                const term = pronounceBtn.closest('.glossary-term').querySelector('h3').textContent;
                speakTerm(term);
            }
        });
    }

    function loadGlossaryData() {
        if (!glossaryGrid) return;
        updateGlossaryStatus('Loading glossary terms...');

        fetch('gloassary.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to fetch glossary data');
                }
                return response.text();
            })
            .then(text => {
                const parsedTerms = parseGlossaryData(text);
                glossaryState.data = parsedTerms.length ? parsedTerms : fallbackGlossary;

                if (!parsedTerms.length) {
                    updateGlossaryStatus('Using fallback glossary dataset. Please ensure gloassary.txt is populated.', true);
                } else {
                    updateGlossaryStatus(`${glossaryState.data.length} terms available.`);
                }

                populateCategoryOptions(glossaryState.data);
                applyGlossaryFilters();
            })
            .catch(error => {
                console.error('Glossary load error:', error);
                glossaryState.data = fallbackGlossary;
                populateCategoryOptions(glossaryState.data);
                applyGlossaryFilters();
                updateGlossaryStatus('Unable to load gloassary.txt. Showing fallback glossary dataset.', true);
            });
    }

    function parseGlossaryData(text) {
        const pattern = /TermModel\(([\s\S]*?)\)/g;
        const terms = [];
        let match;

        while ((match = pattern.exec(text)) !== null) {
            const block = match[1];
            const term = extractField(block, 'englishTerm');
            if (!term) continue;

            const definition = extractField(block, 'definition');
            const translation = extractField(block, 'uzbekTranslation');
            const category = extractField(block, 'category') || 'General';

            terms.push({
                term,
                definition,
                translation,
                category,
                letter: term.charAt(0).toUpperCase()
            });
        }

        const uniqueTerms = [];
        const seenTerms = new Set();

        terms.forEach(item => {
            const key = item.term.toLowerCase();
            if (!seenTerms.has(key)) {
                seenTerms.add(key);
                uniqueTerms.push(item);
            }
        });

        return uniqueTerms.sort((a, b) => a.term.localeCompare(b.term));
    }

    function extractField(block, fieldName) {
        const regex = new RegExp(`${fieldName}:\\s*'([^']*)'`, 'i');
        const match = block.match(regex);
        return match ? match[1].replace(/\\'/g, '\'').trim() : '';
    }

    function populateCategoryOptions(terms) {
        if (!categoryFilter) return;
        categoryFilter.querySelectorAll('option:not([value="all"])').forEach(option => option.remove());

        const categories = [...new Set(terms.map(term => term.category).filter(Boolean))]
            .sort((a, b) => a.localeCompare(b));

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.toLowerCase();
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    function applyGlossaryFilters() {
        if (!glossaryGrid || !glossaryState.data.length) return;
        const { search, category, letter } = glossaryState.filters;

        const filtered = glossaryState.data.filter(item => {
            const matchesSearch = !search ||
                item.term.toLowerCase().includes(search) ||
                (item.definition && item.definition.toLowerCase().includes(search)) ||
                (item.translation && item.translation.toLowerCase().includes(search));

            const matchesCategory = category === 'all' || item.category.toLowerCase() === category;
            const matchesLetter = letter === 'all' || item.letter.toLowerCase() === letter;

            return matchesSearch && matchesCategory && matchesLetter;
        });

        renderGlossaryTerms(filtered);

        if (glossaryStatus) {
            const total = glossaryState.data.length;
            const text = filtered.length === total
                ? `${total} terms available.`
                : `${filtered.length} of ${total} terms match your filters.`;
            glossaryStatus.textContent = text;
            glossaryStatus.classList.remove('glossary-status-error');
        }
    }

    function renderGlossaryTerms(terms) {
        if (!glossaryGrid) return;

        if (!terms.length) {
            glossaryGrid.innerHTML = '<p class="text-center" style="color: var(--text-light);">No terms match your filters yet.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        terms.forEach(item => {
            const card = document.createElement('div');
            card.className = 'glossary-term';
            card.setAttribute('data-letter', item.letter.toLowerCase());
            card.setAttribute('data-category', item.category.toLowerCase());
            card.innerHTML = `
                <div class="term-meta">
                    <span class="category-pill">${item.category || 'General'}</span>
                    <button class="btn btn-outline pronunciation-btn" type="button" aria-label="Pronounce ${item.term}">
                        🔊 Pronounce
                    </button>
                </div>
                <h3>${item.term}</h3>
                <p class="definition">${item.definition || 'Definition unavailable.'}</p>
                <p class="translation"><strong>Uzbek:</strong> ${item.translation || 'Tarjima mavjud emas.'}</p>
            `;
            fragment.appendChild(card);
        });

        glossaryGrid.innerHTML = '';
        glossaryGrid.appendChild(fragment);
    }

    function updateGlossaryStatus(message, isError = false) {
        if (!glossaryStatus) return;
        glossaryStatus.textContent = message;
        glossaryStatus.style.color = isError ? '#dc2626' : 'var(--text-light)';
    }

    function speakTerm(term) {
        if (!('speechSynthesis' in window)) {
            alert('Speech synthesis is not supported in this browser.');
            return;
        }
        const utterance = new SpeechSynthesisUtterance(term);
        speechSynthesis.speak(utterance);
    }

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



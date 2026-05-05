document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinksContainer.classList.toggle('mobile-active');

            // Disable scroll when menu is open
            if (navLinksContainer.classList.contains('mobile-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when a link is clicked
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinksContainer.classList.remove('mobile-active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Don't unobserve if we want animations to repeat, but usually keeping it adds performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.service-card, .work-item, .section-header, .process-step');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        revealObserver.observe(el);
    });

    // Add styles for revealed elements dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Google Apps Script Form Submission
    const clientForm = document.getElementById('clientForm');
    if (clientForm) {
        const scriptURL = "https://script.google.com/macros/s/AKfycbyGvVU8pS-LsusSgqxWNXfcNsKEjxXEdCP5FIR5FvsfOCVgJ0fDq1WQuGp7QadGz8Jdqw/exec";
        clientForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = clientForm.querySelector('button');
            const originalText = btn.innerHTML;

            // UI Feedback: Loading state
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            const data = {
                name: clientForm.querySelector('[id="name"], [name="name"]').value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                project: document.getElementById("project").value,
                message: document.getElementById("message").value
            };

            fetch(scriptURL, {
                method: "POST",
                body: JSON.stringify(data)
            })
                .then(response => response.text())
                .then(result => {
                    // UI Feedback: Success state
                    btn.innerHTML = 'Sent Successfully!';
                    btn.style.background = '#10b981';
                    alert("Registration Successful");
                    clientForm.reset();

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    btn.innerHTML = 'Error. Try Again';
                    btn.style.background = '#ef4444';

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }

    // Smooth Scroll for Nav Links, Premium Button, and Hero Buttons
    document.querySelectorAll('.nav-link, .btn-premium-blink, .hero-btns a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Update active state
            document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
            this.classList.add('active');

            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Review Form Submission Logic
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');

    if (reviewForm && reviewsList) {
        // Load reviews from local storage if any
        const savedReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
        savedReviews.forEach(review => {
            const reviewEl = createReviewElement(review.name, review.rating, review.text);
            reviewsList.appendChild(reviewEl); // Appends to the end
        });

        reviewForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = reviewForm.querySelector('#name').value;
            const ratingInput = reviewForm.querySelector('#rating').value;
            const text = reviewForm.querySelector('#feedback').value;

            // Rating bound logic
            let rating = parseInt(ratingInput);
            if (rating < 1) rating = 1;
            if (rating > 5) rating = 5;

            // 1. Save to local storage
            const newReview = { name, rating, text };
            savedReviews.push(newReview);
            localStorage.setItem('userReviews', JSON.stringify(savedReviews));

            // 2. Add to UI (show at top or bottom depending on preference, we will put it at the bottom below manuals)
            const reviewEl = createReviewElement(name, rating, text);
            reviewsList.appendChild(reviewEl);

            // 3. Reset form
            reviewForm.reset();
            
            // 4. Scroll to see the new review smoothly
            reviewEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

        function createReviewElement(name, rating, text) {
            const card = document.createElement('div');
            card.className = 'review-card';
            
            let starsHtml = '';
            for (let i = 0; i < 5; i++) {
                if (i < rating) {
                    starsHtml += '<i class="fas fa-star"></i>';
                } else {
                    starsHtml += '<i class="far fa-star"></i>'; // empty star
                }
            }

            card.innerHTML = `
                <div class="review-header">
                    <h4>${name}</h4>
                    <div class="review-rating">${starsHtml}</div>
                </div>
                <p>"${text}"</p>
            `;
            return card;
        }
    }
});
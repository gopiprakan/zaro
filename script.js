import { auth, db, googleProvider } from './firebase-config.js';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    signInWithPopup
} from 'firebase/auth';
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';

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

    // --- Toast Notification System ---
    function showToast(message, type = 'success') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 50);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 4000);
    }

    // --- Reveal Animations (initialized at the bottom to ensure DOM settlement) ---

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
                    btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                    btn.style.background = '#10b981';
                    showToast("Registration Successful! We will contact you soon.", "success");
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
                    showToast("Error. Please try again or email us directly.", "error");

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

    // Review Form Submission Logic & Firestore Integration
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');

    if (reviewForm && reviewsList) {
        // Load reviews from Firestore
        const loadReviews = async () => {
            try {
                const q = query(collection(db, "reviews"), orderBy("timestamp", "asc"));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    const review = doc.data();
                    if (review.name && review.feedback) {
                        const reviewEl = createReviewElement(review.name, review.rating || 5, review.feedback);
                        reviewEl.classList.add('stagger-item', 'revealed');
                        reviewsList.appendChild(reviewEl);
                    }
                });
            } catch (err) {
                console.error("Error loading reviews:", err);
            }
        };

        loadReviews();

        reviewForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = reviewForm.querySelector('#name').value.trim();
            const ratingInput = reviewForm.querySelector('#rating').value;
            const text = reviewForm.querySelector('#feedback').value.trim();

            let rating = parseInt(ratingInput);
            if (rating < 1) rating = 1;
            if (rating > 5) rating = 5;

            const submitBtn = reviewForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

            try {
                // Save to Firestore
                await addDoc(collection(db, "reviews"), {
                    name,
                    rating,
                    feedback: text,
                    timestamp: serverTimestamp()
                });

                // Add to UI with a gorgeous fade-in slide transition
                const reviewEl = createReviewElement(name, rating, text);
                reviewEl.classList.add('stagger-item');
                reviewsList.appendChild(reviewEl);
                
                // Force reflow and add revealed class for smooth, premium transition
                reviewEl.getBoundingClientRect();
                reviewEl.classList.add('revealed');

                // Reset form and show success toast
                reviewForm.reset();
                showToast("Thank you for your feedback!", "success");
                
                // Scroll to see the new review smoothly
                reviewEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } catch (err) {
                console.error("Error adding review:", err);
                showToast("Could not submit review. Please try again.", "error");
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
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

    // Auth Modal Logic & Firebase Auth Integration
    const loginBtn = document.getElementById('loginBtn');
    const authModal = document.getElementById('authModal');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const tabLogin = document.getElementById('tabLogin');
    const tabSignup = document.getElementById('tabSignup');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const googleSignInBtn = document.getElementById('googleSignInBtn');
    const userProfile = document.getElementById('userProfile');

    // Monitor Firebase Auth State Changed
    onAuthStateChanged(auth, (user) => {
        const loginBtnEl = document.getElementById('loginBtn');
        const userProfileEl = document.getElementById('userProfile');
        const userNameDisplay = document.getElementById('userNameDisplay');
        const profileImg = document.getElementById('profileImg');

        if (user) {
            const name = user.displayName || user.email.split('@')[0] || 'User';
            if (loginBtnEl) loginBtnEl.style.display = 'none';
            if (userProfileEl) {
                userProfileEl.style.display = 'flex';
                userNameDisplay.textContent = name;
                profileImg.src = user.photoURL || `https://ui-avatars.com/api/?name=${name}&background=random&color=fff`;
            }
        } else {
            if (loginBtnEl) loginBtnEl.style.display = 'inline-flex';
            if (userProfileEl) userProfileEl.style.display = 'none';
        }
    });

    // Sign out confirmation handler on profile click
    if (userProfile) {
        userProfile.addEventListener('click', async () => {
            if (confirm("Do you want to sign out?")) {
                try {
                    await signOut(auth);
                    showToast("Signed out successfully!", "success");
                } catch (err) {
                    showToast(err.message, "error");
                }
            }
        });
    }

    if (loginBtn && authModal) {
        loginBtn.addEventListener('click', () => {
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeAuthModal.addEventListener('click', () => {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('active');
            tabSignup.classList.remove('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        });

        tabSignup.addEventListener('click', () => {
            tabSignup.classList.add('active');
            tabLogin.classList.remove('active');
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
        });
        
        // Handle login form submission
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const emailInput = loginForm.querySelector('input[type="email"]').value.trim();
                const passwordInput = loginForm.querySelector('input[type="password"]').value;
                
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';

                try {
                    await signInWithEmailAndPassword(auth, emailInput, passwordInput);
                    authModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    loginForm.reset();
                    showToast("Signed in successfully!", "success");
                } catch (err) {
                    console.error("Login failure:", err);
                    showToast(err.message, "error");
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            });
        }
        
        // Handle signup form submission
        if (signupForm) {
            signupForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const nameInput = signupForm.querySelector('input[placeholder="Full Name"]').value.trim();
                const emailInput = signupForm.querySelector('input[type="email"]').value.trim();
                const passwordInput = signupForm.querySelector('input[type="password"]').value;

                const submitBtn = signupForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';

                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
                    await updateProfile(userCredential.user, {
                        displayName: nameInput
                    });
                    authModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    signupForm.reset();
                    showToast(`Account created successfully! Welcome, ${nameInput}.`, "success");
                } catch (err) {
                    console.error("Signup failure:", err);
                    showToast(err.message, "error");
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            });
        }

        // Handle Google Sign-In
        if (googleSignInBtn) {
            googleSignInBtn.addEventListener('click', async () => {
                const originalText = googleSignInBtn.innerHTML;
                googleSignInBtn.disabled = true;
                googleSignInBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';

                try {
                    const result = await signInWithPopup(auth, googleProvider);
                    const user = result.user;
                    authModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    showToast(`Welcome, ${user.displayName || 'User'}!`, "success");
                } catch (err) {
                    console.error("Google login failure:", err);
                    showToast(err.message, "error");
                } finally {
                    googleSignInBtn.disabled = false;
                    googleSignInBtn.innerHTML = originalText;
                }
            });
        }
    }

    // --- Premium Dynamic Scroll Reveal System ---
    // Inject reveal styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        /* Dynamic scroll reveal animations */
        .reveal-element {
            opacity: 0;
            transform: translateY(35px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-element.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .stagger-item {
            opacity: 0;
            transform: translateY(35px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stagger-item.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* Hero entry page load animations */
        .hero-title, .hero-subtitle, .hero-btns {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-title.loaded, .hero-subtitle.loaded, .hero-btns.loaded {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Staggered containers and their children initialization
    const staggerConfigs = [
        { container: '.services-grid', children: '.service-card' },
        { container: '.process-list', children: '.process-step' },
        { container: '.work-grid', children: '.work-item' },
        { container: '.reviews-list', children: '.review-card' }
    ];

    staggerConfigs.forEach(config => {
        const container = document.querySelector(config.container);
        if (container) {
            container.classList.add('stagger-container');
            const items = container.querySelectorAll(config.children);
            items.forEach(item => {
                item.classList.add('stagger-item');
            });
        }
    });

    // Individual elements reveal initialization
    const individualSelectors = [
        '.section-header',
        '.contact-content',
        '.contact-form',
        '.review-form-wrapper'
    ];

    individualSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('reveal-element');
        });
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px' // Triggers slightly before element is fully in frame
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                if (target.classList.contains('stagger-container')) {
                    const items = target.querySelectorAll('.stagger-item:not(.revealed)');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('revealed');
                        }, index * 120); // 120ms staggered delay between items
                    });
                    revealObserver.unobserve(target);
                } else if (target.classList.contains('reveal-element')) {
                    target.classList.add('revealed');
                    revealObserver.unobserve(target);
                }
            }
        });
    }, observerOptions);

    // Register all reveal triggers
    document.querySelectorAll('.stagger-container, .reveal-element').forEach(el => {
        revealObserver.observe(el);
    });

    // Hero entry page-load animations triggered sequentially
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBtns = document.querySelector('.hero-btns');

    if (heroTitle && heroSubtitle && heroBtns) {
        setTimeout(() => {
            heroTitle.classList.add('loaded');
        }, 150);
        setTimeout(() => {
            heroSubtitle.classList.add('loaded');
        }, 350);
        setTimeout(() => {
            heroBtns.classList.add('loaded');
        }, 550);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    // Check if device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        document.documentElement.style.cursor = 'auto';
    } else {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            setTimeout(() => {
                follower.style.left = e.clientX - 11 + 'px';
                follower.style.top = e.clientY - 11 + 'px';
            }, 50);
        });
    }

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

    // Expand cursor on hover
    const links = document.querySelectorAll('a, button, .service-card, .work-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.style.transform = 'scale(2.5)';
            follower.style.background = 'rgba(59, 130, 246, 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            follower.style.transform = 'scale(1)';
            follower.style.background = 'transparent';
        });
    });

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

    // Form Mock Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Message Sent!';
                btn.style.background = '#10b981';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
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

    // --- Chat Assistant Logic ---
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendChat = document.getElementById('send-chat');
    const chatSuggestions = document.getElementById('chat-suggestions');
    const notificationDot = document.querySelector('.notification-dot');

    let chatActive = false;
    let step = 0;
    const userData = {
        name: '',
        email: '',
        interest: ''
    };

    const botResponses = {
        welcome: "Hi there! 👋 I'm your ZARO assistant. How can I help you today?",
        askName: "To get started, could you tell me your name?",
        askEmail: (name) => `Thanks, ${name}! And what's your email address?`,
        askInterest: "Great! What kind of project are you looking to build?",
        finish: "Awesome! I've noted your details. One of our experts will reach out to you within 24 hours. Anything else you'd like to know?",
        contact: "You can reach us directly at <b>9043379569</b> or email <b>zaroweb.in@gmail.com</b>. We're available 24/7!",
        pricing: "Our projects are highly affordable and tailored to your needs. E-commerce shops start at a very competitive rate with lifetime hosting included!"
    };

    const suggestions = [
        { text: "Build a Website", value: "build" },
        { text: "Check Pricing", value: "pricing" },
        { text: "Contact Details", value: "contact" }
    ];

    function toggleChat() {
        chatActive = !chatActive;
        chatWindow.classList.toggle('active', chatActive);
        if (chatActive) {
            notificationDot.style.display = 'none';
            if (chatMessages.children.length === 0) {
                setTimeout(() => addBotMessage(botResponses.welcome), 500);
                setTimeout(() => showSuggestions(), 1200);
            }
        }
    }

    function addMessage(text, isBot = true) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
        msgDiv.innerHTML = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addBotMessage(text) {
        // Simple typing effect simulation
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing';
        typingDiv.innerHTML = '...';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            typingDiv.remove();
            addMessage(text, true);
        }, 1000);
    }

    function showSuggestions() {
        chatSuggestions.innerHTML = '';
        suggestions.forEach(s => {
            const btn = document.createElement('button');
            btn.className = 'suggestion-btn';
            btn.innerText = s.text;
            btn.onclick = () => handleSuggestion(s);
            chatSuggestions.appendChild(btn);
        });
    }

    function handleSuggestion(s) {
        addMessage(s.text, false);
        chatSuggestions.innerHTML = '';

        if (s.value === 'contact') {
            setTimeout(() => addBotMessage(botResponses.contact), 500);
            setTimeout(() => showSuggestions(), 2000);
        } else if (s.value === 'pricing') {
            setTimeout(() => addBotMessage(botResponses.pricing), 500);
            setTimeout(() => showSuggestions(), 2000);
        } else if (s.value === 'build') {
            step = 1;
            setTimeout(() => addBotMessage(botResponses.askName), 500);
        }
    }

    function handleUserInput() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, false);
        chatInput.value = '';

        if (step === 1) {
            userData.name = text;
            step = 2;
            addBotMessage(botResponses.askEmail(userData.name));
        } else if (step === 2) {
            userData.email = text;
            step = 3;
            addBotMessage(botResponses.finish);
            setTimeout(() => showSuggestions(), 2000);
            console.log('Lead captured:', userData); // In a real app, send to server
        } else {
            addBotMessage("I'm still learning! But I've noted that. Would you like to check our services?");
            setTimeout(() => showSuggestions(), 2000);
        }
    }

    chatToggle.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);
    sendChat.addEventListener('click', handleUserInput);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserInput();
    });
});

/**
 * ZARO PLATFORM & DEMOLY WEB STUDIO - CYBER-LUXE ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 0. HIGH-PRECISION 60 FPS PERFORMANCE ENGINE & EVENT SCHEDULERS
    // =========================================================================

    // Utility: RequestAnimationFrame Throttle to lock DOM updates to 60 FPS
    function rafThrottle(fn) {
        let ticking = false;
        return function (...args) {
            if (!ticking) {
                requestAnimationFrame(() => {
                    fn.apply(this, args);
                    ticking = false;
                });
                ticking = true;
            }
        };
    }

    // Utility: Micro-debounce for search & high-frequency text input
    function debounce(fn, delay = 40) {
        let timer = null;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // Real-Time High-Precision FPS Engine & Performance Monitor
    let frameCount = 0;
    let lastFpsTime = performance.now();
    const fpsTextEl = document.getElementById('fpsText');
    const fpsBadgeEl = document.getElementById('fpsBadge');

    function updateFPSLoop() {
        const now = performance.now();
        frameCount++;

        if (now - lastFpsTime >= 1000) {
            const currentFps = Math.min(60, Math.round((frameCount * 1000) / (now - lastFpsTime)));
            if (fpsTextEl) {
                fpsTextEl.textContent = `${currentFps} FPS`;
            }
            if (fpsBadgeEl) {
                if (currentFps >= 54) {
                    fpsBadgeEl.style.color = 'var(--accent-emerald)';
                    fpsBadgeEl.style.borderColor = 'rgba(48, 209, 88, 0.3)';
                } else if (currentFps >= 38) {
                    fpsBadgeEl.style.color = 'var(--accent-amber)';
                    fpsBadgeEl.style.borderColor = 'rgba(255, 159, 10, 0.3)';
                } else {
                    fpsBadgeEl.style.color = 'var(--accent-rose)';
                    fpsBadgeEl.style.borderColor = 'rgba(255, 59, 48, 0.3)';
                }
            }
            frameCount = 0;
            lastFpsTime = now;
        }

        requestAnimationFrame(updateFPSLoop);
    }
    requestAnimationFrame(updateFPSLoop);

    // =========================================================================
    // 1. DATA & STATE MANAGEMENT
    // =========================================================================

    let savedFavorites = JSON.parse(localStorage.getItem('zaro_favorites') || '[]');
    let canvasHistory = [];
    let historyStep = -1;

    const FREELANCERS_DATA = [
        {
            id: 1,
            name: "Alex Rivera",
            role: "Senior Full Stack & Demoly Engineer",
            rating: 4.95,
            reviews: 48,
            rate: 85,
            category: "fullstack",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
            tags: ["Demoly Studio", "React", "Node.js", "TailwindCSS"],
            verified: true,
            bio: "Specializing in high-frequency web engineering and visual web builder design with over 8 years of production experience."
        },
        {
            id: 2,
            name: "Elena Rostova",
            role: "UI/UX & Minimalist Designer",
            rating: 5.0,
            reviews: 62,
            rate: 95,
            category: "design",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
            tags: ["Figma", "Webtools", "Apple Design", "CSS3"],
            verified: true,
            bio: "Crafting modern glassmorphic interface systems and minimalist product experiences for top tech brands globally."
        },
        {
            id: 3,
            name: "Marcus Vance",
            role: "Demoly Architect Specialist",
            rating: 4.88,
            reviews: 31,
            rate: 70,
            category: "demoly",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
            tags: ["Demoly Blocks", "HTML5", "JavaScript", "Performance"],
            verified: true,
            bio: "Expert at transforming design specs into clean, modular Demoly Studio components with 100/100 Lighthouse scores."
        },
        {
            id: 4,
            name: "Sophia Chen",
            role: "Webtools Integration Engineer",
            rating: 4.92,
            reviews: 55,
            rate: 110,
            category: "webtools",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
            tags: ["CSS Generators", "WebGL", "Canvas API", "UI Testing"],
            verified: true,
            bio: "Front-end performance engineer specializing in WebGL shaders, CSS layout engines, and custom generator tools."
        }
    ];

    const BLOCK_TEMPLATES = {
        navbar: `
        <div class="canvas-block demo-navbar-block" data-type="navbar">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn dup-block-btn" title="Duplicate Block"><i class="fas fa-copy"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div style="font-weight: 700; font-size: 1.15rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-cubes" style="color:var(--accent-cyan);"></i> ZARO App</div>
            <div style="display: flex; gap: 1.75rem; font-size: 0.85rem; color: var(--text-secondary); font-weight: 500;">
                <span>Features</span>
                <span>Solutions</span>
                <span>Pricing</span>
                <span>Docs</span>
            </div>
            <button class="btn btn-blue btn-sm">Launch App</button>
        </div>`,

        hero: `
        <div class="canvas-block demo-hero-block" data-type="hero">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn dup-block-btn" title="Duplicate Block"><i class="fas fa-copy"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <span style="font-size: 0.775rem; font-weight: 700; color: var(--accent-cyan); letter-spacing: 0.08em; display: inline-block; margin-bottom: 0.6rem; text-transform: uppercase;">NEXT-GEN ENGINEERING</span>
            <h1 class="demo-hero-title">Designed to Perform.<br>Crafted for Speed.</h1>
            <p style="color: var(--text-secondary); max-width: 580px; margin: 0 auto 1.85rem; font-size: 1.1rem; line-height: 1.5;">Customized live with Demoly Studio and built for high-frequency web apps.</p>
            <div style="display: flex; gap: 0.75rem; justify-content: center;">
                <button class="btn btn-blue">Get Started</button>
                <button class="btn btn-secondary">Learn More</button>
            </div>
        </div>`,

        features: `
        <div class="canvas-block demo-features-block" data-type="features">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn dup-block-btn" title="Duplicate Block"><i class="fas fa-copy"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div class="demo-feature-card">
                <i class="fas fa-bolt" style="font-size: 1.6rem; color: var(--accent-cyan); margin-bottom: 0.85rem;"></i>
                <h3 style="font-size: 1.1rem; font-weight: 700;">Pro Performance</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.35rem;">Zero runtime overhead with ultra-fast page speed scores.</p>
            </div>
            <div class="demo-feature-card">
                <i class="fas fa-magic" style="font-size: 1.6rem; color: var(--accent-purple); margin-bottom: 0.85rem;"></i>
                <h3 style="font-size: 1.1rem; font-weight: 700;">Demoly Customizer</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.35rem;">Live layout tweaking directly inside your web browser.</p>
            </div>
            <div class="demo-feature-card">
                <i class="fas fa-shield-alt" style="font-size: 1.6rem; color: var(--accent-emerald); margin-bottom: 0.85rem;"></i>
                <h3 style="font-size: 1.1rem; font-weight: 700;">Titanium Shield</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.35rem;">Semantic standard HTML markup ready to deploy anywhere.</p>
            </div>
        </div>`,

        techstack: `
        <div class="canvas-block" data-type="techstack" style="padding: 4rem 2rem; text-align: center; background: rgba(255,255,255,0.015);">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn dup-block-btn" title="Duplicate Block"><i class="fas fa-copy"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; color: var(--text-secondary);">POWERED BY MODERN WEB STANDARDS</h3>
            <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem;">
                <span class="skill-tag" style="font-size: 0.9rem; padding: 0.4rem 1rem;"><i class="fab fa-html5" style="color: #e34f26;"></i> HTML5 Semantic</span>
                <span class="skill-tag" style="font-size: 0.9rem; padding: 0.4rem 1rem;"><i class="fab fa-css3-alt" style="color: var(--accent-cyan);"></i> CSS Glassmorphism</span>
                <span class="skill-tag" style="font-size: 0.9rem; padding: 0.4rem 1rem;"><i class="fab fa-js" style="color: var(--accent-amber);"></i> Vanilla JS ES6+</span>
                <span class="skill-tag" style="font-size: 0.9rem; padding: 0.4rem 1rem;"><i class="fab fa-react" style="color: #61dafb;"></i> React Ready</span>
            </div>
        </div>`,

        testimonials: `
        <div class="canvas-block demo-testimonials-block" data-type="testimonials">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn dup-block-btn" title="Duplicate Block"><i class="fas fa-copy"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div style="text-align: center; max-width: 600px; margin: 0 auto 2rem;">
                <h2 style="font-size: 2.25rem; font-weight: 800;">Loved by Engineering Teams</h2>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 0.35rem;">See what engineers say about building with ZARO and Demoly Studio.</p>
            </div>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div style="color: var(--accent-amber); font-size: 0.85rem; margin-bottom: 0.6rem;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    <p style="font-size: 0.875rem; color: var(--text-primary); line-height: 1.55;">"Demoly Studio allowed our team to prototype and export production HTML/CSS components in under an hour."</p>
                    <div style="font-size: 0.825rem; font-weight: 700; margin-top: 0.9rem;">David K. — CTO at Apex AI</div>
                </div>
                <div class="testimonial-card">
                    <div style="color: var(--accent-amber); font-size: 0.85rem; margin-bottom: 0.6rem;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    <p style="font-size: 0.875rem; color: var(--text-primary); line-height: 1.55;">"The Webtools suite and instant CSS generators have become an essential part of my daily engineering workflow."</p>
                    <div style="font-size: 0.825rem; font-weight: 700; margin-top: 0.9rem;">Sarah L. — Staff Architect</div>
                </div>
            </div>
        </div>`,

        stats: `
        <div class="canvas-block demo-stats-block" data-type="stats">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn dup-block-btn" title="Duplicate Block"><i class="fas fa-copy"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div class="stat-card">
                <h2>$12M+</h2>
                <p>Volume Built</p>
            </div>
            <div class="stat-card">
                <h2>99.99%</h2>
                <p>Uptime Score</p>
            </div>
            <div class="stat-card">
                <h2>45k+</h2>
                <p>Active Users</p>
            </div>
            <div class="stat-card">
                <h2>0.1ms</h2>
                <p>Render Latency</p>
            </div>
        </div>`,

        pricing: `
        <div class="canvas-block demo-pricing-block" data-type="pricing">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn dup-block-btn" title="Duplicate Block"><i class="fas fa-copy"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div class="demo-price-card">
                <h4 style="font-weight: 700;">Starter</h4>
                <h2 style="font-size: 2.25rem; margin: 0.75rem 0;">$29<span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 400;">/mo</span></h2>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">Essential visual site builder and export suite.</p>
                <button class="btn btn-secondary btn-sm" style="width: 100%; margin-top: 1.35rem;">Choose Starter</button>
            </div>
            <div class="demo-price-card" style="border-color: var(--accent-cyan); background: rgba(0, 242, 254, 0.04);">
                <span class="status-pulse" style="margin-bottom: 0.35rem; font-size: 0.7rem;">MOST POPULAR STUDIO TIER</span>
                <h4 style="font-weight: 700;">Pro Architect</h4>
                <h2 style="font-size: 2.25rem; margin: 0.75rem 0;">$79<span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 400;">/mo</span></h2>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">Demoly Studio + full Webtools & CSS Suite.</p>
                <button class="btn btn-blue btn-sm" style="width: 100%; margin-top: 1.35rem;">Choose Pro</button>
            </div>
        </div>`,

        cta: `
        <div class="canvas-block demo-cta-block" data-type="cta">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn dup-block-btn" title="Duplicate Block"><i class="fas fa-copy"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <h2 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem;">Start Building with ZARO Demoly</h2>
            <p style="color: var(--text-secondary); max-width: 520px; margin: 0 auto 1.65rem; font-size: 1rem;">Join thousands of web architects crafting minimal, high-frequency websites.</p>
            <div style="display: flex; gap: 0.6rem; max-width: 440px; margin: 0 auto;">
                <input type="email" placeholder="Enter work email..." style="flex: 1; background: var(--apple-bg); border: 1px solid var(--apple-border); padding: 0.65rem 1.1rem; border-radius: var(--radius-full); color: #fff; font-size: 0.875rem;">
                <button class="btn btn-blue btn-sm">Get Started</button>
            </div>
        </div>`,

        faq: `
        <div class="canvas-block demo-faq-block" data-type="faq">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn dup-block-btn" title="Duplicate Block"><i class="fas fa-copy"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <h2 style="font-size: 2rem; text-align: center; margin-bottom: 1.75rem; font-weight: 800;">Frequently Asked Questions</h2>
            <div class="faq-item active">
                <div class="faq-question"><span>What is ZARO Demoly Studio?</span> <i class="fas fa-chevron-down"></i></div>
                <div class="faq-answer">Demoly Studio is a browser-based visual website builder with instant clean HTML/CSS code export capabilities.</div>
            </div>
            <div class="faq-item">
                <div class="faq-question"><span>Can I export clean code for production?</span> <i class="fas fa-chevron-down"></i></div>
                <div class="faq-answer">Yes, 100% clean, semantic markup ready to deploy to Vercel, Netlify, or any static host.</div>
            </div>
        </div>`,

        footer: `
        <div class="canvas-block" data-type="footer" style="padding: 2.75rem 2rem; background: var(--apple-surface); border-top: 1px solid var(--apple-border-subtle);">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn dup-block-btn" title="Duplicate Block"><i class="fas fa-copy"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                <div style="font-weight: 700; font-size: 1.1rem;"><i class="fas fa-cubes" style="color: var(--accent-cyan);"></i> ZARO Demoly Studio</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary);">Copyright © 2026 ZARO Inc. All rights reserved.</div>
            </div>
        </div>`
    };

    // Helper: Toast Notifications
    function showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        
        let icon = '<i class="fas fa-info-circle" style="color: var(--accent-cyan);"></i>';
        if (type === 'success' || type === 'blue') icon = '<i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i>';
        if (type === 'warning') icon = '<i class="fas fa-exclamation-triangle" style="color: var(--accent-amber);"></i>';

        toast.innerHTML = `${icon} <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Helper: Clipboard Copy
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!', 'success');
        }).catch(() => {
            showToast('Failed to copy', 'warning');
        });
    }

    // =========================================================================
    // 2. VIEW NAVIGATION & TAB SWITCHER
    // =========================================================================

    const navTabs = document.querySelectorAll('.tab-btn');
    const viewSections = document.querySelectorAll('.view-section');

    function switchView(viewId) {
        viewSections.forEach(sec => {
            sec.classList.remove('active-view');
            if (sec.id === viewId) {
                sec.classList.add('active-view');
            }
        });

        navTabs.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-view') === viewId) {
                btn.classList.add('active');
            }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetView = btn.getAttribute('data-view');
            switchView(targetView);
        });
    });

    document.getElementById('openBuilderNavBtn')?.addEventListener('click', () => {
        switchView('view-demoly');
    });

    document.getElementById('logoBtn')?.addEventListener('click', () => {
        switchView('view-marketplace');
    });

    // =========================================================================
    // 3. FREELANCE MARKETPLACE ENGINE
    // =========================================================================

    const freelancersGrid = document.getElementById('freelancersGrid');
    const talentDirectoryGrid = document.getElementById('talentDirectoryGrid');
    const rateFilter = document.getElementById('rateFilter');
    const rateFilterVal = document.getElementById('rateFilterVal');
    const categoryItems = document.querySelectorAll('#categoryFilterList .filter-item');
    const marketplaceSearch = document.getElementById('marketplaceSearch');
    const toggleFavoritesBtn = document.getElementById('toggleFavoritesBtn');
    let showFavoritesOnly = false;

    function renderFreelancerCard(f) {
        const isFav = savedFavorites.includes(f.id);
        return `
        <div class="freelancer-card apple-card">
            <div>
                <div class="freelancer-card-top">
                    <div style="display: flex; align-items: center; gap: 0.9rem;">
                        <div class="freelancer-avatar-wrapper">
                            <img src="${f.avatar}" alt="${f.name}" class="avatar">
                            <span class="avatar-online-dot"></span>
                        </div>
                        <div class="freelancer-info">
                            <h3 data-id="${f.id}" class="talent-name-click" style="cursor: pointer;">
                                ${f.name} ${f.verified ? '<i class="fas fa-check-circle" style="color:var(--accent-cyan); font-size:0.85rem;"></i>' : ''}
                            </h3>
                            <p class="freelancer-role">${f.role}</p>
                        </div>
                    </div>
                    <button class="bookmark-btn ${isFav ? 'active' : ''}" data-id="${f.id}" title="${isFav ? 'Remove Favorite' : 'Save Favorite'}">
                        <i class="${isFav ? 'fas' : 'far'} fa-star"></i>
                    </button>
                </div>
                <div style="display: flex; align-items: center; gap: 0.45rem; font-size: 0.825rem; color: var(--accent-amber); margin-bottom: 0.65rem;">
                    <i class="fas fa-star"></i>
                    <strong style="color: var(--text-primary); font-size: 0.9rem;">${f.rating}</strong>
                    <span style="color: var(--text-tertiary);">(${f.reviews} verified projects)</span>
                </div>
                <div class="tags-container">
                    ${f.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
                </div>
            </div>

            <div class="freelancer-footer">
                <div class="rate">$${f.rate} <span style="font-size: 0.775rem; color: var(--text-secondary); font-weight: 400;">/ hr</span></div>
                <div style="display: flex; gap: 0.4rem;">
                    <button class="btn btn-secondary btn-sm profile-view-btn" data-id="${f.id}">Profile</button>
                    <button class="btn btn-blue btn-sm hire-btn" data-name="${f.name}" data-role="${f.role}">Hire</button>
                </div>
            </div>
        </div>`;
    }

    function updateMarketplaceGrid() {
        if (!freelancersGrid) return;
        const maxRate = parseInt(rateFilter?.value || 150);
        const activeCategory = document.querySelector('#categoryFilterList .filter-item.active')?.getAttribute('data-cat') || 'all';
        const searchQuery = (marketplaceSearch?.value || '').toLowerCase();

        const filtered = FREELANCERS_DATA.filter(f => {
            const matchesRate = f.rate <= maxRate;
            const matchesCat = activeCategory === 'all' || f.category === activeCategory;
            const matchesSearch = f.name.toLowerCase().includes(searchQuery) ||
                f.role.toLowerCase().includes(searchQuery) ||
                f.tags.some(t => t.toLowerCase().includes(searchQuery));
            const matchesFav = !showFavoritesOnly || savedFavorites.includes(f.id);
            return matchesRate && matchesCat && matchesSearch && matchesFav;
        });

        freelancersGrid.innerHTML = filtered.length > 0 ? filtered.map(renderFreelancerCard).join('') : '<div style="padding: 3rem; text-align: center; color: var(--text-tertiary); grid-column: 1/-1;">No specialists matched your filter criteria.</div>';
        if (talentDirectoryGrid) {
            talentDirectoryGrid.innerHTML = FREELANCERS_DATA.map(renderFreelancerCard).join('');
        }

        // Attach Card Action Event Listeners
        document.querySelectorAll('.hire-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.getAttribute('data-name');
                const role = btn.getAttribute('data-role');
                openHireModal(name, role);
            });
        });

        document.querySelectorAll('.profile-view-btn, .talent-name-click').forEach(el => {
            el.addEventListener('click', () => {
                const id = parseInt(el.getAttribute('data-id'));
                const talent = FREELANCERS_DATA.find(f => f.id === id);
                if (talent) openTalentModal(talent);
            });
        });

        document.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                if (savedFavorites.includes(id)) {
                    savedFavorites = savedFavorites.filter(favId => favId !== id);
                    showToast('Removed from favorites', 'info');
                } else {
                    savedFavorites.push(id);
                    showToast('Saved to favorites!', 'success');
                }
                localStorage.setItem('zaro_favorites', JSON.stringify(savedFavorites));
                updateMarketplaceGrid();
            });
        });
    }

    const rafUpdateMarketplaceGrid = rafThrottle(updateMarketplaceGrid);
    const debouncedSearch = debounce(rafUpdateMarketplaceGrid, 30);

    toggleFavoritesBtn?.addEventListener('click', () => {
        showFavoritesOnly = !showFavoritesOnly;
        toggleFavoritesBtn.classList.toggle('active', showFavoritesOnly);
        toggleFavoritesBtn.innerHTML = showFavoritesOnly ? '<i class="fas fa-star" style="color:var(--accent-amber);"></i> Showing Favorites' : '<i class="far fa-star"></i> Saved Talent';
        rafUpdateMarketplaceGrid();
    });

    rateFilter?.addEventListener('input', rafThrottle((e) => {
        if (rateFilterVal) rateFilterVal.textContent = `$${e.target.value}/hr`;
        rafUpdateMarketplaceGrid();
    }));

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            rafUpdateMarketplaceGrid();
        });
    });

    marketplaceSearch?.addEventListener('input', debouncedSearch);

    // Initial render
    updateMarketplaceGrid();

    // =========================================================================
    // 4. DEMOLY VISUAL WEBSITE STUDIO ENGINE (WITH UNDO/REDO & LIVE CUSTOMIZER)
    // =========================================================================

    const builderCanvas = document.getElementById('builderCanvas');
    const canvasEmptyState = document.getElementById('canvasEmptyState');
    const blockPresetCards = document.querySelectorAll('.block-preset-card');
    const clearCanvasBtn = document.getElementById('clearCanvasBtn');
    const exportCodeBtn = document.getElementById('exportCodeBtn');
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');

    // Sidebar Tab Switcher inside Studio
    const tabBlocksBtn = document.getElementById('tabBlocksBtn');
    const tabCustomizerBtn = document.getElementById('tabCustomizerBtn');
    const tabThemesBtn = document.getElementById('tabThemesBtn');
    const sidebarBlocksContent = document.getElementById('sidebarBlocksContent');
    const sidebarCustomizerContent = document.getElementById('sidebarCustomizerContent');
    const sidebarThemesContent = document.getElementById('sidebarThemesContent');

    tabBlocksBtn?.addEventListener('click', () => {
        [tabBlocksBtn, tabCustomizerBtn, tabThemesBtn].forEach(b => b?.classList.remove('active'));
        tabBlocksBtn.classList.add('active');
        sidebarBlocksContent.style.display = 'block';
        sidebarCustomizerContent.style.display = 'none';
        sidebarThemesContent.style.display = 'none';
    });

    tabCustomizerBtn?.addEventListener('click', () => {
        [tabBlocksBtn, tabCustomizerBtn, tabThemesBtn].forEach(b => b?.classList.remove('active'));
        tabCustomizerBtn.classList.add('active');
        sidebarCustomizerContent.style.display = 'block';
        sidebarBlocksContent.style.display = 'none';
        sidebarThemesContent.style.display = 'none';
    });

    tabThemesBtn?.addEventListener('click', () => {
        [tabBlocksBtn, tabCustomizerBtn, tabThemesBtn].forEach(b => b?.classList.remove('active'));
        tabThemesBtn.classList.add('active');
        sidebarThemesContent.style.display = 'block';
        sidebarBlocksContent.style.display = 'none';
        sidebarCustomizerContent.style.display = 'none';
    });

    // Undo / Redo State Save
    function saveCanvasSnapshot() {
        const blocks = Array.from(builderCanvas.querySelectorAll('.canvas-block')).map(b => b.outerHTML);
        canvasHistory = canvasHistory.slice(0, historyStep + 1);
        canvasHistory.push(blocks);
        historyStep++;
    }

    undoBtn?.addEventListener('click', () => {
        if (historyStep > 0) {
            historyStep--;
            restoreCanvasSnapshot(canvasHistory[historyStep]);
            showToast('Undo performed', 'info');
        }
    });

    redoBtn?.addEventListener('click', () => {
        if (historyStep < canvasHistory.length - 1) {
            historyStep++;
            restoreCanvasSnapshot(canvasHistory[historyStep]);
            showToast('Redo performed', 'info');
        }
    });

    function restoreCanvasSnapshot(snapshot) {
        const currentBlocks = builderCanvas.querySelectorAll('.canvas-block');
        currentBlocks.forEach(b => b.remove());
        if (!snapshot || snapshot.length === 0) {
            if (canvasEmptyState) canvasEmptyState.style.display = 'block';
            return;
        }
        if (canvasEmptyState) canvasEmptyState.style.display = 'none';
        snapshot.forEach(html => {
            const temp = document.createElement('div');
            temp.innerHTML = html.trim();
            const el = temp.firstChild;
            builderCanvas.appendChild(el);
            attachBlockEventListeners(el);
        });
    }

    // Viewport Controls
    const vpDesktop = document.getElementById('vpDesktop');
    const vpTablet = document.getElementById('vpTablet');
    const vpMobile = document.getElementById('vpMobile');

    vpDesktop?.addEventListener('click', () => setViewport('desktop'));
    vpTablet?.addEventListener('click', () => setViewport('tablet'));
    vpMobile?.addEventListener('click', () => setViewport('mobile'));

    function setViewport(vp) {
        [vpDesktop, vpTablet, vpMobile].forEach(btn => btn?.classList.remove('active'));
        builderCanvas.classList.remove('vp-tablet', 'vp-mobile');

        if (vp === 'desktop') {
            vpDesktop?.classList.add('active');
        } else if (vp === 'tablet') {
            vpTablet?.classList.add('active');
            builderCanvas.classList.add('vp-tablet');
        } else if (vp === 'mobile') {
            vpMobile?.classList.add('active');
            builderCanvas.classList.add('vp-mobile');
        }
    }

    // Add Block to Canvas
    blockPresetCards.forEach(card => {
        card.addEventListener('click', () => {
            const blockType = card.getAttribute('data-block-type');
            if (BLOCK_TEMPLATES[blockType]) {
                addBlockToCanvas(blockType);
            }
        });
    });

    function addBlockToCanvas(blockType) {
        if (canvasEmptyState) {
            canvasEmptyState.style.display = 'none';
        }

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = BLOCK_TEMPLATES[blockType].trim();
        const blockEl = tempDiv.firstChild;

        builderCanvas.appendChild(blockEl);
        attachBlockEventListeners(blockEl);
        saveCanvasSnapshot();
        showToast(`Added ${blockType.toUpperCase()} component block!`, 'blue');
    }

    function attachBlockEventListeners(blockEl) {
        const deleteBtn = blockEl.querySelector('.delete-block-btn');
        const dupBtn = blockEl.querySelector('.dup-block-btn');
        const moveUpBtn = blockEl.querySelector('.move-up-btn');
        const moveDownBtn = blockEl.querySelector('.move-down-btn');
        const editBtn = blockEl.querySelector('.edit-block-btn');

        deleteBtn?.addEventListener('click', () => {
            blockEl.remove();
            if (builderCanvas.children.length <= 1) {
                if (canvasEmptyState) canvasEmptyState.style.display = 'block';
            }
            saveCanvasSnapshot();
            showToast('Block deleted.', 'info');
        });

        dupBtn?.addEventListener('click', () => {
            const clone = blockEl.cloneNode(true);
            blockEl.parentNode.insertBefore(clone, blockEl.nextSibling);
            attachBlockEventListeners(clone);
            saveCanvasSnapshot();
            showToast('Block duplicated!', 'blue');
        });

        moveUpBtn?.addEventListener('click', () => {
            if (blockEl.previousElementSibling && blockEl.previousElementSibling !== canvasEmptyState) {
                builderCanvas.insertBefore(blockEl, blockEl.previousElementSibling);
                saveCanvasSnapshot();
            }
        });

        moveDownBtn?.addEventListener('click', () => {
            if (blockEl.nextElementSibling) {
                builderCanvas.insertBefore(blockEl.nextElementSibling, blockEl);
                saveCanvasSnapshot();
            }
        });

        editBtn?.addEventListener('click', () => {
            openBlockEditorModal(blockEl);
        });

        // FAQ accordion toggle
        blockEl.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }

    // Live Customizer Inputs
    const customizerAccentColor = document.getElementById('customizerAccentColor');
    const customizerRadiusInput = document.getElementById('customizerRadiusInput');
    const customizerRadiusVal = document.getElementById('customizerRadiusVal');
    const customizerFontSelect = document.getElementById('customizerFontSelect');

    customizerAccentColor?.addEventListener('input', rafThrottle((e) => {
        const color = e.target.value;
        builderCanvas.querySelectorAll('.demo-hero-title, h1, h2, h3').forEach(el => el.style.color = color);
        showToast('Updated canvas title accent color', 'info');
    }));

    customizerRadiusInput?.addEventListener('input', rafThrottle((e) => {
        const rad = `${e.target.value}px`;
        if (customizerRadiusVal) customizerRadiusVal.textContent = rad;
        builderCanvas.querySelectorAll('.demo-feature-card, .demo-price-card, .testimonial-card').forEach(el => el.style.borderRadius = rad);
    }));

    customizerFontSelect?.addEventListener('change', (e) => {
        builderCanvas.style.fontFamily = e.target.value;
        showToast('Canvas typography updated', 'blue');
    });

    // Fullscreen Live Preview Mode Logic
    const toggleLivePreviewBtn = document.getElementById('toggleLivePreviewBtn');
    const previewModeOverlay = document.getElementById('previewModeOverlay');
    const previewContainer = document.getElementById('previewContainer');
    const closePreviewModeBtn = document.getElementById('closePreviewModeBtn');

    toggleLivePreviewBtn?.addEventListener('click', () => {
        const blocks = builderCanvas.querySelectorAll('.canvas-block');
        if (blocks.length === 0) {
            showToast('Add components to canvas before launching live preview!', 'warning');
            return;
        }
        previewContainer.innerHTML = '';
        blocks.forEach(b => {
            const clone = b.cloneNode(true);
            const controls = clone.querySelector('.canvas-block-controls');
            if (controls) controls.remove();
            previewContainer.appendChild(clone);
        });
        previewModeOverlay.classList.add('active');
    });

    closePreviewModeBtn?.addEventListener('click', () => {
        previewModeOverlay.classList.remove('active');
    });

    // Inline Block Editor Modal Logic
    const editBlockModal = document.getElementById('editBlockModal');
    const closeEditBlockModalBtn = document.getElementById('closeEditBlockModalBtn');
    const editBlockTitleInput = document.getElementById('editBlockTitleInput');
    const editBlockDescInput = document.getElementById('editBlockDescInput');
    const editBlockBtnInput = document.getElementById('editBlockBtnInput');
    const saveBlockEditBtn = document.getElementById('saveBlockEditBtn');
    let currentEditingBlock = null;

    function openBlockEditorModal(blockEl) {
        currentEditingBlock = blockEl;
        const titleEl = blockEl.querySelector('h1, h2, h3, h4');
        const descEl = blockEl.querySelector('p');
        const btnEl = blockEl.querySelector('.btn-blue, .btn-primary, button');

        if (editBlockTitleInput) editBlockTitleInput.value = titleEl ? titleEl.innerText : '';
        if (editBlockDescInput) editBlockDescInput.value = descEl ? descEl.innerText : '';
        if (editBlockBtnInput) editBlockBtnInput.value = btnEl ? btnEl.innerText : '';

        editBlockModal.classList.add('active');
    }

    closeEditBlockModalBtn?.addEventListener('click', () => {
        editBlockModal.classList.remove('active');
    });

    saveBlockEditBtn?.addEventListener('click', () => {
        if (!currentEditingBlock) return;

        const titleEl = currentEditingBlock.querySelector('h1, h2, h3, h4');
        const descEl = currentEditingBlock.querySelector('p');
        const btnEl = currentEditingBlock.querySelector('.btn-blue, .btn-primary, button');

        if (titleEl && editBlockTitleInput.value.trim() !== '') {
            titleEl.innerText = editBlockTitleInput.value.trim();
        }
        if (descEl && editBlockDescInput.value.trim() !== '') {
            descEl.innerText = editBlockDescInput.value.trim();
        }
        if (btnEl && editBlockBtnInput.value.trim() !== '') {
            btnEl.innerText = editBlockBtnInput.value.trim();
        }

        editBlockModal.classList.remove('active');
        saveCanvasSnapshot();
        showToast('Block content updated live on canvas!', 'blue');
    });

    // Preset Layout Loaders
    document.getElementById('loadSaasPresetBtn')?.addEventListener('click', () => {
        const blocks = builderCanvas.querySelectorAll('.canvas-block');
        blocks.forEach(b => b.remove());
        ['navbar', 'hero', 'features', 'techstack', 'testimonials', 'cta', 'footer'].forEach(type => addBlockToCanvas(type));
        showToast('Loaded SaaS Landing Page Preset!', 'blue');
    });

    document.getElementById('loadPortfolioPresetBtn')?.addEventListener('click', () => {
        const blocks = builderCanvas.querySelectorAll('.canvas-block');
        blocks.forEach(b => b.remove());
        ['navbar', 'hero', 'stats', 'testimonials', 'footer'].forEach(type => addBlockToCanvas(type));
        showToast('Loaded Portfolio Studio Preset!', 'blue');
    });

    clearCanvasBtn?.addEventListener('click', () => {
        const blocks = builderCanvas.querySelectorAll('.canvas-block');
        blocks.forEach(b => b.remove());
        if (canvasEmptyState) canvasEmptyState.style.display = 'block';
        saveCanvasSnapshot();
        showToast('Demoly Canvas cleared.', 'info');
    });

    // Theme Selector
    const themeSwatches = document.querySelectorAll('.theme-swatch');
    themeSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            themeSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');

            const theme = swatch.getAttribute('data-theme');
            if (theme === 'cyan-dark') {
                builderCanvas.style.background = '#000000';
            } else if (theme === 'violet-dark') {
                builderCanvas.style.background = '#0f0a1c';
            } else if (theme === 'emerald-dark') {
                builderCanvas.style.background = '#05140c';
            } else if (theme === 'amber-dark') {
                builderCanvas.style.background = '#190e05';
            }
            showToast(`Applied ${swatch.textContent.trim()} Theme`, 'blue');
        });
    });

    // Initialize Canvas snapshot
    saveCanvasSnapshot();

    // =========================================================================
    // 5. WEB TOOLS ENGINE (GLASS, SHADOW, MESH, PALETTE, FLEX, GRID)
    // =========================================================================

    // Tool 1: Glassmorphism Generator
    const blurInput = document.getElementById('blurInput');
    const opacityInput = document.getElementById('opacityInput');
    const radiusInput = document.getElementById('radiusInput');
    const glassPreviewBox = document.getElementById('glass-preview-box');
    const glassCssCode = document.getElementById('glassCssCode');

    function updateGlassmorphism() {
        if (!glassPreviewBox) return;
        const blur = blurInput.value;
        const opacity = opacityInput.value;
        const radius = radiusInput.value;

        document.getElementById('blurVal').textContent = `${blur}px`;
        document.getElementById('opacityVal').textContent = opacity;
        document.getElementById('radiusVal').textContent = `${radius}px`;

        const css = `background: rgba(255, 255, 255, ${opacity}); backdrop-filter: blur(${blur}px); border-radius: ${radius}px;`;
        glassPreviewBox.style.background = `rgba(255, 255, 255, ${opacity})`;
        glassPreviewBox.style.backdropFilter = `blur(${blur}px)`;
        glassPreviewBox.style.borderRadius = `${radius}px`;
        glassCssCode.textContent = css;
    }

    [blurInput, opacityInput, radiusInput].forEach(inp => inp?.addEventListener('input', rafThrottle(updateGlassmorphism)));

    // Tool 2: Shadow Generator
    const shadowBlurInput = document.getElementById('shadowBlurInput');
    const shadowSpreadInput = document.getElementById('shadowSpreadInput');
    const shadowPreviewBox = document.getElementById('shadow-preview-box');
    const shadowCssCode = document.getElementById('shadowCssCode');

    function updateShadow() {
        if (!shadowPreviewBox) return;
        const blur = shadowBlurInput.value;
        const spread = shadowSpreadInput.value;

        document.getElementById('shadowBlurVal').textContent = `${blur}px`;
        document.getElementById('shadowSpreadVal').textContent = `${spread}px`;

        const css = `box-shadow: 0px 20px ${blur}px ${spread}px rgba(0, 0, 0, 0.5);`;
        shadowPreviewBox.style.boxShadow = `0px 20px ${blur}px ${spread}px rgba(0, 0, 0, 0.5)`;
        shadowCssCode.textContent = css;
    }

    [shadowBlurInput, shadowSpreadInput].forEach(inp => inp?.addEventListener('input', rafThrottle(updateShadow)));

    // Tool 3: Gradient Mesh Generator
    const gradColor1 = document.getElementById('gradColor1');
    const gradColor2 = document.getElementById('gradColor2');
    const gradAngleInput = document.getElementById('gradAngleInput');
    const meshPreviewStage = document.getElementById('mesh-preview-stage');
    const gradCssCode = document.getElementById('gradCssCode');

    function updateGradient() {
        if (!meshPreviewStage) return;
        const c1 = gradColor1.value;
        const c2 = gradColor2.value;
        const angle = gradAngleInput.value;

        document.getElementById('gradAngleVal').textContent = `${angle}deg`;

        const css = `background: linear-gradient(${angle}deg, ${c1}, ${c2});`;
        meshPreviewStage.style.background = `linear-gradient(${angle}deg, ${c1}, ${c2})`;
        gradCssCode.textContent = css;
    }

    [gradColor1, gradColor2, gradAngleInput].forEach(inp => inp?.addEventListener('input', rafThrottle(updateGradient)));

    // Tool 5: Palette Studio
    const randomizePaletteBtn = document.getElementById('randomizePaletteBtn');
    const paletteGrid = document.getElementById('paletteGrid');
    const paletteCssCode = document.getElementById('paletteCssCode');
    const copyPaletteCodeBtn = document.getElementById('copyPaletteCodeBtn');

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function generateRandomPalette() {
        if (!paletteGrid) return;
        const colors = [
            '#030305',
            '#0d0d11',
            getRandomColor(),
            getRandomColor(),
            getRandomColor()
        ];

        const chips = paletteGrid.querySelectorAll('.palette-chip');
        chips.forEach((chip, idx) => {
            const hex = colors[idx];
            chip.style.background = hex;
            chip.setAttribute('data-color', hex);
            chip.textContent = hex;
        });

        const css = `--bg: ${colors[0]}; --surface: ${colors[1]}; --primary: ${colors[2]}; --accent: ${colors[3]}; --highlight: ${colors[4]};`;
        if (paletteCssCode) paletteCssCode.textContent = css;
    }

    randomizePaletteBtn?.addEventListener('click', generateRandomPalette);

    paletteGrid?.querySelectorAll('.palette-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const color = chip.getAttribute('data-color');
            copyToClipboard(color);
        });
    });

    copyPaletteCodeBtn?.addEventListener('click', () => {
        if (paletteCssCode) copyToClipboard(paletteCssCode.textContent);
    });

    // Tool 6: Flexbox Studio
    const flexDirSelect = document.getElementById('flexDirSelect');
    const flexJustifySelect = document.getElementById('flexJustifySelect');
    const flexStage = document.getElementById('flexStage');
    const flexCssCode = document.getElementById('flexCssCode');
    const copyFlexCodeBtn = document.getElementById('copyFlexCodeBtn');

    function updateFlexStage() {
        if (!flexStage) return;
        const dir = flexDirSelect.value;
        const justify = flexJustifySelect.value;

        flexStage.style.flexDirection = dir;
        flexStage.style.justifyContent = justify;

        const css = `display: flex; flex-direction: ${dir}; justify-content: ${justify}; align-items: center; gap: 0.5rem;`;
        if (flexCssCode) flexCssCode.textContent = css;
    }

    flexDirSelect?.addEventListener('change', updateFlexStage);
    flexJustifySelect?.addEventListener('change', updateFlexStage);
    copyFlexCodeBtn?.addEventListener('click', () => {
        if (flexCssCode) copyToClipboard(flexCssCode.textContent);
    });

    // Tool 7: CSS Grid Generator Studio
    const gridColsInput = document.getElementById('gridColsInput');
    const gridGapInput = document.getElementById('gridGapInput');
    const gridPreviewStage = document.getElementById('gridPreviewStage');
    const gridCssCode = document.getElementById('gridCssCode');
    const copyGridCodeBtn = document.getElementById('copyGridCodeBtn');

    function updateGridStage() {
        if (!gridPreviewStage) return;
        const cols = gridColsInput.value;
        const gap = gridGapInput.value;

        document.getElementById('gridColsVal').textContent = cols;
        document.getElementById('gridGapVal').textContent = `${gap}px`;

        gridPreviewStage.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridPreviewStage.style.gap = `${gap}px`;

        const css = `display: grid; grid-template-columns: repeat(${cols}, 1fr); gap: ${gap}px;`;
        if (gridCssCode) gridCssCode.textContent = css;
    }

    [gridColsInput, gridGapInput].forEach(inp => inp?.addEventListener('input', rafThrottle(updateGridStage)));
    copyGridCodeBtn?.addEventListener('click', () => {
        if (gridCssCode) copyToClipboard(gridCssCode.textContent);
    });

    // Audit Inspector Simulator
    document.getElementById('runAuditBtn')?.addEventListener('click', () => {
        showToast('Running Inspector Audit...', 'blue');
        setTimeout(() => {
            showToast('Audit complete! Scores verified 100/100.', 'success');
        }, 600);
    });

    // Copy Code Buttons
    document.getElementById('copyGlassCodeBtn')?.addEventListener('click', () => copyToClipboard(glassCssCode.textContent));
    document.getElementById('copyShadowCodeBtn')?.addEventListener('click', () => copyToClipboard(shadowCssCode.textContent));
    document.getElementById('copyGradCodeBtn')?.addEventListener('click', () => copyToClipboard(gradCssCode.textContent));

    // =========================================================================
    // 6. EXPORT CODE & MODALS
    // =========================================================================

    const exportModal = document.getElementById('exportModal');
    const closeExportModalBtn = document.getElementById('closeExportModalBtn');
    const exportedCodeTextarea = document.getElementById('exportedCodeTextarea');
    const copyExportedCodeBtn = document.getElementById('copyExportedCodeBtn');
    const downloadCodeBtn = document.getElementById('downloadCodeBtn');

    exportCodeBtn?.addEventListener('click', () => {
        const blocks = builderCanvas.querySelectorAll('.canvas-block');
        if (blocks.length === 0) {
            showToast('Add at least one block to export code!', 'warning');
            return;
        }

        let cleanHtml = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>Demoly Generated Site</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n`;

        blocks.forEach(b => {
            const clone = b.cloneNode(true);
            const controls = clone.querySelector('.canvas-block-controls');
            if (controls) controls.remove();
            cleanHtml += `    ${clone.outerHTML.trim()}\n`;
        });

        cleanHtml += `</body>\n</html>`;

        exportedCodeTextarea.value = cleanHtml;
        exportModal.classList.add('active');
    });

    closeExportModalBtn?.addEventListener('click', () => exportModal.classList.remove('active'));
    copyExportedCodeBtn?.addEventListener('click', () => copyToClipboard(exportedCodeTextarea.value));

    downloadCodeBtn?.addEventListener('click', () => {
        const blob = new Blob([exportedCodeTextarea.value], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'demoly-site.html';
        a.click();
        URL.revokeObjectURL(url);
        showToast('Downloaded demoly-site.html', 'blue');
    });

    // Hire Proposal Modal Logic
    const hireModal = document.getElementById('hireModal');
    const closeHireModalBtn = document.getElementById('closeHireModalBtn');
    const submitProposalBtn = document.getElementById('submitProposalBtn');
    const hireModalSub = document.getElementById('hireModalSub');

    function openHireModal(name, role) {
        if (hireModalSub) hireModalSub.textContent = `Send direct proposal to ${name} (${role})`;
        hireModal.classList.add('active');
    }

    closeHireModalBtn?.addEventListener('click', () => hireModal.classList.remove('active'));
    submitProposalBtn?.addEventListener('click', () => {
        hireModal.classList.remove('active');
        showToast('Proposal submitted successfully!', 'success');
    });

    // Talent Detail Modal Logic
    const talentModal = document.getElementById('talentModal');
    const closeTalentModalBtn = document.getElementById('closeTalentModalBtn');
    const talentModalAvatar = document.getElementById('talentModalAvatar');
    const talentModalName = document.getElementById('talentModalName');
    const talentModalRole = document.getElementById('talentModalRole');
    const talentModalRate = document.getElementById('talentModalRate');
    const talentModalRating = document.getElementById('talentModalRating');
    const talentModalProjects = document.getElementById('talentModalProjects');
    const talentModalTags = document.getElementById('talentModalTags');
    const talentModalHireBtn = document.getElementById('talentModalHireBtn');
    let activeModalTalent = null;

    function openTalentModal(t) {
        activeModalTalent = t;
        if (talentModalAvatar) talentModalAvatar.src = t.avatar;
        if (talentModalName) talentModalName.textContent = t.name;
        if (talentModalRole) talentModalRole.textContent = t.role;
        if (talentModalRate) talentModalRate.textContent = `$${t.rate}/hr`;
        if (talentModalRating) talentModalRating.textContent = `${t.rating}★`;
        if (talentModalProjects) talentModalProjects.textContent = t.reviews;
        if (talentModalTags) {
            talentModalTags.innerHTML = t.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('');
        }
        talentModal.classList.add('active');
    }

    closeTalentModalBtn?.addEventListener('click', () => talentModal.classList.remove('active'));
    talentModalHireBtn?.addEventListener('click', () => {
        talentModal.classList.remove('active');
        if (activeModalTalent) openHireModal(activeModalTalent.name, activeModalTalent.role);
    });

    // Post Project Modal Logic
    const postProjectModal = document.getElementById('postProjectModal');
    const postJobBtn = document.getElementById('postJobBtn');
    const closePostProjectModalBtn = document.getElementById('closePostProjectModalBtn');
    const submitPostProjectBtn = document.getElementById('submitPostProjectBtn');

    postJobBtn?.addEventListener('click', () => postProjectModal.classList.add('active'));
    closePostProjectModalBtn?.addEventListener('click', () => postProjectModal.classList.remove('active'));
    submitPostProjectBtn?.addEventListener('click', () => {
        postProjectModal.classList.remove('active');
        showToast('Project requirement published to ZARO network!', 'success');
    });

});
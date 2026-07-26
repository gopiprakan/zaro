/**
 * ZARO PLATFORM & DEMOLY WEB STUDIO - APPLE-INSPIRED ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. DATA & STATE MANAGEMENT
    // =========================================================================

    const FREELANCERS_DATA = [
        {
            id: 1,
            name: "Alex Rivera",
            role: "Senior Full Stack & Demoly Engineer",
            rating: 4.9,
            reviews: 48,
            rate: 85,
            category: "fullstack",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
            tags: ["Demoly Studio", "React", "Node.js", "TailwindCSS"],
            verified: true
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
            verified: true
        },
        {
            id: 3,
            name: "Marcus Vance",
            role: "Demoly Architect Specialist",
            rating: 4.8,
            reviews: 31,
            rate: 70,
            category: "demoly",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
            tags: ["Demoly Blocks", "HTML5", "JavaScript", "Performance"],
            verified: true
        },
        {
            id: 4,
            name: "Sophia Chen",
            role: "Webtools Integration Engineer",
            rating: 4.9,
            reviews: 55,
            rate: 110,
            category: "webtools",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
            tags: ["CSS Generators", "WebGL", "Canvas API", "UI Testing"],
            verified: true
        }
    ];

    const BLOCK_TEMPLATES = {
        navbar: `
        <div class="canvas-block demo-navbar-block" data-type="navbar">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div style="font-weight: 600; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fas fa-layer-group" style="color:var(--apple-blue);"></i> ZARO App</div>
            <div style="display: flex; gap: 1.5rem; font-size: 0.85rem; color: var(--text-secondary);">
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
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--apple-blue); letter-spacing: 0.05em; display: inline-block; margin-bottom: 0.5rem;">NEXT-GEN ENGINEERING</span>
            <h1 class="demo-hero-title">Designed to Perform.<br>Crafted for You.</h1>
            <p style="color: var(--text-secondary); max-width: 550px; margin: 0 auto 1.75rem; font-size: 1.05rem;">Customized live with Demoly Studio and built for speed, elegance, and precision.</p>
            <div style="display: flex; gap: 0.75rem; justify-content: center;">
                <button class="btn btn-blue">Get Started</button>
                <button class="btn btn-secondary">Learn More</button>
            </div>
        </div>`,

        features: `
        <div class="canvas-block demo-features-block" data-type="features">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div class="demo-feature-card">
                <i class="fas fa-bolt" style="font-size: 1.5rem; color: var(--apple-blue); margin-bottom: 0.75rem;"></i>
                <h3 style="font-size: 1.05rem; font-weight: 600;">Pro Performance</h3>
                <p style="font-size: 0.825rem; color: var(--text-secondary); margin-top: 0.35rem;">Minimal CSS footprint and instantaneous load times.</p>
            </div>
            <div class="demo-feature-card">
                <i class="fas fa-magic" style="font-size: 1.5rem; color: var(--apple-purple); margin-bottom: 0.75rem;"></i>
                <h3 style="font-size: 1.05rem; font-weight: 600;">Demoly Customizer</h3>
                <p style="font-size: 0.825rem; color: var(--text-secondary); margin-top: 0.35rem;">Live layout editing directly inside your web browser.</p>
            </div>
            <div class="demo-feature-card">
                <i class="fas fa-shield-alt" style="font-size: 1.5rem; color: var(--apple-green); margin-bottom: 0.75rem;"></i>
                <h3 style="font-size: 1.05rem; font-weight: 600;">Monochrome Shield</h3>
                <p style="font-size: 0.825rem; color: var(--text-secondary); margin-top: 0.35rem;">Clean semantic markup ready to deploy anywhere.</p>
            </div>
        </div>`,

        testimonials: `
        <div class="canvas-block demo-testimonials-block" data-type="testimonials">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div style="text-align: center; max-width: 600px; margin: 0 auto 2rem;">
                <h2 style="font-size: 2rem; font-weight: 700;">Loved by Innovators Worldwide</h2>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.35rem;">See what engineers say about building with ZARO and Demoly Studio.</p>
            </div>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div style="color: var(--apple-orange); font-size: 0.8rem; margin-bottom: 0.5rem;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    <p style="font-size: 0.85rem; color: var(--text-primary); line-height: 1.5;">"Demoly Studio allowed our design team to prototype and deploy clean UI blocks in minutes instead of days."</p>
                    <div style="font-size: 0.8rem; font-weight: 600; margin-top: 0.85rem;">David K. — CTO at Apex AI</div>
                </div>
                <div class="testimonial-card">
                    <div style="color: var(--apple-orange); font-size: 0.8rem; margin-bottom: 0.5rem;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    <p style="font-size: 0.85rem; color: var(--text-primary); line-height: 1.5;">"The Webtools suite and instant code generator have become an essential part of my daily engineering workflow."</p>
                    <div style="font-size: 0.8rem; font-weight: 600; margin-top: 0.85rem;">Sarah L. — Staff Engineer</div>
                </div>
            </div>
        </div>`,

        stats: `
        <div class="canvas-block demo-stats-block" data-type="stats">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div class="stat-card">
                <h2>$12M+</h2>
                <p>Volume Built</p>
            </div>
            <div class="stat-card">
                <h2>99.9%</h2>
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
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div class="demo-price-card">
                <h4 style="font-weight: 600;">Starter</h4>
                <h2 style="font-size: 2rem; margin: 0.75rem 0;">$29<span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 400;">/mo</span></h2>
                <p style="font-size: 0.825rem; color: var(--text-secondary);">Essential site builder and export suite.</p>
                <button class="btn btn-secondary btn-sm" style="width: 100%; margin-top: 1.25rem;">Choose Plan</button>
            </div>
            <div class="demo-price-card" style="border-color: var(--apple-blue); background: rgba(41, 151, 255, 0.05);">
                <span style="font-size: 0.7rem; font-weight: 600; color: var(--apple-blue); text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; margin-bottom: 0.35rem;">MOST POPULAR</span>
                <h4 style="font-weight: 600;">Pro Studio</h4>
                <h2 style="font-size: 2rem; margin: 0.75rem 0;">$79<span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 400;">/mo</span></h2>
                <p style="font-size: 0.825rem; color: var(--text-secondary);">Demoly Studio + full Webtools Suite.</p>
                <button class="btn btn-blue btn-sm" style="width: 100%; margin-top: 1.25rem;">Choose Plan</button>
            </div>
        </div>`,

        cta: `
        <div class="canvas-block demo-cta-block" data-type="cta">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <h2 style="font-size: 2.25rem; font-weight: 700; margin-bottom: 0.5rem;">Start Building with ZARO Demoly</h2>
            <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 1.5rem; font-size: 0.95rem;">Join thousands of web architects crafting minimal, high-frequency websites.</p>
            <div style="display: flex; gap: 0.5rem; max-width: 420px; margin: 0 auto;">
                <input type="email" placeholder="Enter work email..." style="flex: 1; background: var(--apple-bg); border: 1px solid var(--apple-border); padding: 0.6rem 1rem; border-radius: var(--radius-full); color: #fff; font-size: 0.85rem;">
                <button class="btn btn-blue btn-sm">Get Started</button>
            </div>
        </div>`,

        faq: `
        <div class="canvas-block demo-faq-block" data-type="faq">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <h2 style="font-size: 1.75rem; text-align: center; margin-bottom: 1.5rem;">Frequently Asked Questions</h2>
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
        <div class="canvas-block" data-type="footer" style="padding: 2.5rem 2rem; background: var(--apple-surface); border-top: 1px solid var(--apple-border-subtle);">
            <div class="canvas-block-controls">
                <button class="block-btn edit-block-btn" title="Edit Content"><i class="fas fa-edit"></i></button>
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                <div style="font-weight: 600; font-size: 1.05rem;"><i class="fas fa-layer-group"></i> ZARO Demoly Studio</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">Copyright © 2026 ZARO Inc. All rights reserved.</div>
            </div>
        </div>`
    };

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

    function renderFreelancerCard(f) {
        return `
        <div class="freelancer-card apple-card">
            <div>
                <div class="freelancer-header">
                    <img src="${f.avatar}" alt="${f.name}" class="avatar">
                    <div class="freelancer-info">
                        <h3>${f.name} ${f.verified ? '<i class="fas fa-check-circle" style="color:var(--apple-blue); font-size:0.8rem;"></i>' : ''}</h3>
                        <p class="freelancer-role">${f.role}</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: var(--apple-orange); margin-bottom: 0.65rem;">
                    <i class="fas fa-star"></i>
                    <strong style="color: var(--text-primary);">${f.rating}</strong>
                    <span style="color: var(--text-tertiary);">(${f.reviews} projects)</span>
                </div>
                <div class="tags-container">
                    ${f.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
                </div>
            </div>

            <div class="freelancer-footer">
                <div class="rate">$${f.rate} <span style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 400;">/ hr</span></div>
                <button class="btn btn-blue btn-sm hire-btn" data-name="${f.name}" data-role="${f.role}">
                    Hire
                </button>
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
            return matchesRate && matchesCat && matchesSearch;
        });

        freelancersGrid.innerHTML = filtered.map(renderFreelancerCard).join('');
        if (talentDirectoryGrid) {
            talentDirectoryGrid.innerHTML = FREELANCERS_DATA.map(renderFreelancerCard).join('');
        }

        // Attach Hire Button Listeners
        document.querySelectorAll('.hire-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.getAttribute('data-name');
                const role = btn.getAttribute('data-role');
                openHireModal(name, role);
            });
        });
    }

    rateFilter?.addEventListener('input', (e) => {
        if (rateFilterVal) rateFilterVal.textContent = `$${e.target.value}/hr`;
        updateMarketplaceGrid();
    });

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            updateMarketplaceGrid();
        });
    });

    marketplaceSearch?.addEventListener('input', updateMarketplaceGrid);

    // Initial render
    updateMarketplaceGrid();

    // =========================================================================
    // 4. DEMOLY VISUAL WEBSITE STUDIO ENGINE
    // =========================================================================

    const builderCanvas = document.getElementById('builderCanvas');
    const canvasEmptyState = document.getElementById('canvasEmptyState');
    const blockPresetCards = document.querySelectorAll('.block-preset-card');
    const clearCanvasBtn = document.getElementById('clearCanvasBtn');
    const exportCodeBtn = document.getElementById('exportCodeBtn');

    // Sidebar Tab Switching
    const tabBlocksBtn = document.getElementById('tabBlocksBtn');
    const tabThemesBtn = document.getElementById('tabThemesBtn');
    const sidebarBlocksContent = document.getElementById('sidebarBlocksContent');
    const sidebarThemesContent = document.getElementById('sidebarThemesContent');

    tabBlocksBtn?.addEventListener('click', () => {
        tabBlocksBtn.classList.add('active');
        tabThemesBtn.classList.remove('active');
        sidebarBlocksContent.style.display = 'block';
        sidebarThemesContent.style.display = 'none';
    });

    tabThemesBtn?.addEventListener('click', () => {
        tabThemesBtn.classList.add('active');
        tabBlocksBtn.classList.remove('active');
        sidebarThemesContent.style.display = 'block';
        sidebarBlocksContent.style.display = 'none';
    });

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
        showToast(`Added ${blockType.toUpperCase()} block to Demoly Canvas!`, 'blue');
    }

    function attachBlockEventListeners(blockEl) {
        const deleteBtn = blockEl.querySelector('.delete-block-btn');
        const moveUpBtn = blockEl.querySelector('.move-up-btn');
        const moveDownBtn = blockEl.querySelector('.move-down-btn');

        deleteBtn?.addEventListener('click', () => {
            blockEl.remove();
            if (builderCanvas.children.length <= 1) {
                if (canvasEmptyState) canvasEmptyState.style.display = 'block';
            }
            showToast('Block removed from canvas.', 'info');
        });

        moveUpBtn?.addEventListener('click', () => {
            if (blockEl.previousElementSibling && blockEl.previousElementSibling !== canvasEmptyState) {
                builderCanvas.insertBefore(blockEl, blockEl.previousElementSibling);
            }
        });

        moveDownBtn?.addEventListener('click', () => {
            if (blockEl.nextElementSibling) {
                builderCanvas.insertBefore(blockEl.nextElementSibling, blockEl);
            }
        });
    }

    clearCanvasBtn?.addEventListener('click', () => {
        const blocks = builderCanvas.querySelectorAll('.canvas-block');
        blocks.forEach(b => b.remove());
        if (canvasEmptyState) canvasEmptyState.style.display = 'block';
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
                builderCanvas.style.background = '#110e1b';
            } else if (theme === 'emerald-dark') {
                builderCanvas.style.background = '#07140e';
            } else if (theme === 'pink-dark') {
                builderCanvas.style.background = '#170a0e';
            }
            showToast(`Applied ${swatch.textContent.trim()} Theme`, 'blue');
        });
    });

    // =========================================================================
    // 5. WEB TOOLS ENGINE
    // =========================================================================

    // Glassmorphism Generator
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

    [blurInput, opacityInput, radiusInput].forEach(inp => inp?.addEventListener('input', updateGlassmorphism));

    // Shadow Generator
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

    [shadowBlurInput, shadowSpreadInput].forEach(inp => inp?.addEventListener('input', updateShadow));

    // Gradient Mesh Generator
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

    [gradColor1, gradColor2, gradAngleInput].forEach(inp => inp?.addEventListener('input', updateGradient));

    // Audit Calculator
    document.getElementById('runAuditBtn')?.addEventListener('click', () => {
        showToast('Running Web Audit Inspector...', 'blue');
        setTimeout(() => {
            showToast('Audit complete! Scores verified.', 'blue');
        }, 500);
    });

    // Copy Code Buttons
    document.getElementById('copyGlassCodeBtn')?.addEventListener('click', () => {
        copyToClipboard(glassCssCode.textContent);
    });
    document.getElementById('copyShadowCodeBtn')?.addEventListener('click', () => {
        copyToClipboard(shadowCssCode.textContent);
    });
    document.getElementById('copyGradCodeBtn')?.addEventListener('click', () => {
        copyToClipboard(gradCssCode.textContent);
    });

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

    closeExportModalBtn?.addEventListener('click', () => {
        exportModal.classList.remove('active');
    });

    copyExportedCodeBtn?.addEventListener('click', () => {
        copyToClipboard(exportedCodeTextarea.value);
    });

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

    // Hire Modal
    const hireModal = document.getElementById('hireModal');
    const closeHireModalBtn = document.getElementById('closeHireModalBtn');
    const hireModalSub = document.getElementById('hireModalSub');
    const submitProposalBtn = document.getElementById('submitProposalBtn');

    function openHireModal(name, role) {
        if (hireModalSub) {
            hireModalSub.textContent = `Send proposal to ${name} (${role})`;
        }
        hireModal.classList.add('active');
    }

    closeHireModalBtn?.addEventListener('click', () => {
        hireModal.classList.remove('active');
    });

    submitProposalBtn?.addEventListener('click', () => {
        hireModal.classList.remove('active');
        showToast('Proposal submitted! Specialist notified.', 'blue');
    });

    document.getElementById('postJobBtn')?.addEventListener('click', () => {
        openHireModal('ZARO Community', 'Open Project Board');
    });

    // =========================================================================
    // 7. UTILITY FUNCTIONS
    // =========================================================================

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied code to clipboard!', 'blue');
        }).catch(() => {
            showToast('Failed to copy text', 'danger');
        });
    }

    function showToast(msg, type = 'blue') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-check-circle" style="color:var(--apple-blue)"></i> <span>${msg}</span>`;

        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 2800);
    }

});
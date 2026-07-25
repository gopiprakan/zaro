/**
 * ZARO PLATFORM & DEMOLY WEB STUDIO - CORE JAVASCRIPT ENGINE
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
            role: "UI/UX & Glassmorphism Specialist",
            rating: 5.0,
            reviews: 62,
            rate: 95,
            category: "design",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
            tags: ["Figma", "Webtools", "Micro-Animations", "CSS3"],
            verified: true
        },
        {
            id: 3,
            name: "Marcus Vance",
            role: "Demoly Template Architect",
            rating: 4.8,
            reviews: 31,
            rate: 70,
            category: "demoly",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
            tags: ["Demoly Blocks", "HTML5/CSS3", "JavaScript", "SEO"],
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
            tags: ["Shader Gradients", "WebGL", "Canvas API", "Performance"],
            verified: true
        }
    ];

    const BLOCK_TEMPLATES = {
        hero: `
        <div class="canvas-block demo-hero-block" data-type="hero">
            <div class="canvas-block-controls">
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <span class="badge badge-cyan" style="margin-bottom: 1rem;"><i class="fas fa-sparkles"></i> Welcome to Next-Gen</span>
            <h1 class="demo-hero-title">Build Stunning Digital Experiences</h1>
            <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto 2rem;">Customized live with Demoly Studio and powered by high performance design blocks.</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary">Get Started</button>
                <button class="btn btn-secondary">Learn More</button>
            </div>
        </div>`,

        features: `
        <div class="canvas-block demo-features-block" data-type="features">
            <div class="canvas-block-controls">
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div class="demo-feature-card">
                <i class="fas fa-bolt" style="font-size: 2rem; color: var(--accent-cyan); margin-bottom: 1rem;"></i>
                <h3>Lightning Fast</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Optimized CSS & minimal JS footprint for top performance scores.</p>
            </div>
            <div class="demo-feature-card">
                <i class="fas fa-magic" style="font-size: 2rem; color: var(--accent-violet); margin-bottom: 1rem;"></i>
                <h3>Demoly Customizer</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Real-time layout and visual customization directly in browser.</p>
            </div>
            <div class="demo-feature-card">
                <i class="fas fa-shield-alt" style="font-size: 2rem; color: var(--accent-pink); margin-bottom: 1rem;"></i>
                <h3>Production Ready</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Export clean code ready to host anywhere instantly.</p>
            </div>
        </div>`,

        pricing: `
        <div class="canvas-block demo-pricing-block" data-type="pricing">
            <div class="canvas-block-controls">
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div class="demo-price-card">
                <h4>Starter</h4>
                <h2 style="font-size: 2.2rem; margin: 1rem 0;">$29<span style="font-size: 0.9rem; color: var(--text-muted);">/mo</span></h2>
                <p style="font-size: 0.85rem; color: var(--text-muted);">Basic site builder access with export tools.</p>
                <button class="btn btn-secondary btn-sm" style="width: 100%; margin-top: 1.5rem;">Choose Plan</button>
            </div>
            <div class="demo-price-card" style="border-color: var(--accent-cyan); background: rgba(6, 182, 212, 0.08);">
                <span class="badge badge-cyan" style="margin-bottom: 0.5rem;">Popular</span>
                <h4>Pro Studio</h4>
                <h2 style="font-size: 2.2rem; margin: 1rem 0;">$79<span style="font-size: 0.9rem; color: var(--text-muted);">/mo</span></h2>
                <p style="font-size: 0.85rem; color: var(--text-muted);">Demoly studio + custom webtools suite access.</p>
                <button class="btn btn-primary btn-sm" style="width: 100%; margin-top: 1.5rem;">Choose Plan</button>
            </div>
        </div>`,

        footer: `
        <div class="canvas-block" data-type="footer" style="padding: 3rem 2rem; background: var(--bg-surface); border-top: 1px solid var(--border-glass);">
            <div class="canvas-block-controls">
                <button class="block-btn move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="block-btn move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="block-btn danger delete-block-btn" title="Delete Block"><i class="fas fa-trash"></i></button>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                <div style="font-weight: 800; font-size: 1.2rem;">ZARO Demoly Site</div>
                <div style="font-size: 0.85rem; color: var(--text-muted);">© 2026 Designed with Demoly Web Studio. All rights reserved.</div>
            </div>
        </div>`
    };

    let activeCanvasBlocks = [];

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
        <div class="freelancer-card glass-card">
            <div>
                <div class="freelancer-header">
                    <img src="${f.avatar}" alt="${f.name}" class="avatar">
                    <div class="freelancer-info">
                        <h3>${f.name} ${f.verified ? '<i class="fas fa-check-circle" style="color:var(--accent-cyan); font-size:0.85rem;"></i>' : ''}</h3>
                        <p class="freelancer-role">${f.role}</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--accent-amber); margin-bottom: 0.75rem;">
                    <i class="fas fa-star"></i>
                    <strong>${f.rating}</strong>
                    <span style="color: var(--text-dim);">(${f.reviews} projects)</span>
                </div>
                <div class="tags-container">
                    ${f.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
                </div>
            </div>

            <div class="freelancer-footer">
                <div class="rate">$${f.rate} <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 400;">/ hr</span></div>
                <button class="btn btn-primary btn-sm hire-btn" data-name="${f.name}" data-role="${f.role}">
                    Hire Freelancer
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
            btn.addEventListener('click', (e) => {
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
    // 4. DEMOLY VISUAL WEBSITE STUDIO (BUILDER ENGINE)
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

    vpDesktop?.addEventListener('click', () => {
        setViewport('desktop');
    });
    vpTablet?.addEventListener('click', () => {
        setViewport('tablet');
    });
    vpMobile?.addEventListener('click', () => {
        setViewport('mobile');
    });

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
        showToast(`Added ${blockType.toUpperCase()} block to Demoly Canvas!`, 'cyan');
    }

    function attachBlockEventListeners(blockEl) {
        const deleteBtn = blockEl.querySelector('.delete-block-btn');
        const moveUpBtn = blockEl.querySelector('.move-up-btn');
        const moveDownBtn = blockEl.querySelector('.move-down-btn');

        deleteBtn?.addEventListener('click', () => {
            blockEl.remove();
            if (builderCanvas.children.length <= 1) { // 1 accounts for emptyState div
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

    // Theme Swatch Selector
    const themeSwatches = document.querySelectorAll('.theme-swatch');
    themeSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            themeSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');

            const theme = swatch.getAttribute('data-theme');
            if (theme === 'cyan-dark') {
                builderCanvas.style.background = '#0b0f19';
            } else if (theme === 'violet-dark') {
                builderCanvas.style.background = '#0e0b1d';
            } else if (theme === 'emerald-dark') {
                builderCanvas.style.background = '#08120e';
            } else if (theme === 'pink-dark') {
                builderCanvas.style.background = '#150912';
            }
            showToast(`Applied ${swatch.textContent.trim()} Theme`, 'cyan');
        });
    });

    // =========================================================================
    // 5. WEB TOOLS & CUSTOMIZER SUITE LOGIC
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

        const css = `background: rgba(15, 23, 42, ${opacity}); backdrop-filter: blur(${blur}px); border-radius: ${radius}px;`;
        glassPreviewBox.style.background = `rgba(15, 23, 42, ${opacity})`;
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

        const css = `box-shadow: 0px 10px ${blur}px ${spread}px rgba(6, 182, 212, 0.4);`;
        shadowPreviewBox.style.boxShadow = `0px 10px ${blur}px ${spread}px rgba(6, 182, 212, 0.4)`;
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

    // Quick SEO Audit Button
    document.getElementById('runAuditBtn')?.addEventListener('click', () => {
        showToast('Running Web Audit Analysis...', 'cyan');
        setTimeout(() => {
            showToast('Audit complete! Scores updated.', 'emerald');
        }, 600);
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
        showToast('Downloaded demoly-site.html', 'cyan');
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
        showToast('Proposal submitted successfully! Freelancer notified.', 'emerald');
    });

    // Post Job Button
    document.getElementById('postJobBtn')?.addEventListener('click', () => {
        openHireModal('ZARO Community', 'Open Project Board');
    });

    // =========================================================================
    // 7. UTILITY FUNCTIONS (TOAST & CLIPBOARD)
    // =========================================================================

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied code to clipboard!', 'cyan');
        }).catch(err => {
            showToast('Failed to copy text', 'danger');
        });
    }

    function showToast(msg, type = 'cyan') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.borderColor = type === 'emerald' ? 'var(--accent-emerald)' : 'var(--accent-cyan)';
        toast.innerHTML = `<i class="fas fa-check-circle" style="color:${type === 'emerald' ? 'var(--accent-emerald)' : 'var(--accent-cyan)'}"></i> <span>${msg}</span>`;

        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

});
// Pricing page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Client type switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const clientDetails = document.getElementById('client-details');
    const pricingPackages = document.querySelectorAll('.pricing-packages');
    
    // Client type data
    const clientData = {
        small: {
            details: [
                { icon: 'fas fa-euro-sign', text: 'obrat do 100 tisíc eur' },
                { icon: 'fas fa-file-alt', text: 'do 50 dokladov mesačne' },
                { icon: 'fas fa-users', text: 'do 5 zamestnancov' }
            ]
        },
        medium: {
            details: [
                { icon: 'fas fa-euro-sign', text: 'obrat do 1 milión eur' },
                { icon: 'fas fa-file-alt', text: 'do 500 dokladov mesačne' },
                { icon: 'fas fa-users', text: 'do 10 zamestnancov' }
            ]
        },
        large: {
            details: [
                { icon: 'fas fa-euro-sign', text: 'obrat nad 1 milión eur' },
                { icon: 'fas fa-file-alt', text: 'nad 500 dokladov mesačne' },
                { icon: 'fas fa-users', text: 'nad 10 zamestnancov' }
            ]
        }
    };
    
    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const clientType = this.dataset.client;
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update client details
            updateClientDetails(clientType);
            
            // Show/hide pricing packages with animation
            updatePricingPackages(clientType);
            
            // Scroll to pricing content on mobile
            if (window.innerWidth <= 768) {
                const pricingContent = document.querySelector('.pricing-content');
                if (pricingContent) {
                    pricingContent.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    function updateClientDetails(clientType) {
        const data = clientData[clientType];
        if (data && clientDetails) {
            clientDetails.innerHTML = data.details.map(detail => `
                <div class="detail-item">
                    <i class="${detail.icon}"></i>
                    <span>${detail.text}</span>
                </div>
            `).join('');
            
            // Animate details
            const items = clientDetails.querySelectorAll('.detail-item');
            items.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }
    
    function updatePricingPackages(clientType) {
        pricingPackages.forEach(packageDiv => {
            const isTarget = packageDiv.dataset.client === clientType;
            
            if (isTarget) {
                // Fade in
                packageDiv.style.display = 'grid';
                packageDiv.style.opacity = '0';
                packageDiv.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    packageDiv.style.transition = 'all 0.5s ease';
                    packageDiv.style.opacity = '1';
                    packageDiv.style.transform = 'translateY(0)';
                }, 50);
                
                // Stagger card animations
                const cards = packageDiv.querySelectorAll('.pricing-card');
                cards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(40px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 200 + (index * 150));
                });
            } else {
                // Fade out
                packageDiv.style.transition = 'all 0.3s ease';
                packageDiv.style.opacity = '0';
                packageDiv.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    packageDiv.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Package selection functionality
    const selectButtons = document.querySelectorAll('.btn-select');
    
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.dataset.package;
            const price = this.dataset.price;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Open contact modal with package info
            openContactModal(packageName, price);
            
            // Track selection (you can add analytics here)
            console.log('Package selected:', packageName, price);
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        let hoverTimeout;
        
        card.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 20px 40px rgba(139, 90, 60, 0.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                if (!this.classList.contains('popular')) {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '';
                }
            }, 100);
        });
    });
    
    // FAQ functionality (if not already handled in main script)
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items with animation
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const answer = otherItem.querySelector('.faq-answer');
                        if (answer) {
                            answer.style.maxHeight = '0px';
                        }
                    }
                });
                
                // Toggle current item
                const answer = item.querySelector('.faq-answer');
                if (isActive) {
                    item.classList.remove('active');
                    if (answer) {
                        answer.style.maxHeight = '0px';
                    }
                } else {
                    item.classList.add('active');
                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                }
            });
        }
    });
    
    // URL parameter handling for direct package selection
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const clientParam = urlParams.get('client');
    
    if (clientParam && ['small', 'medium', 'large'].includes(clientParam)) {
        // Switch to specific client type
        const targetTab = document.querySelector(`[data-client="${clientParam}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
    
    if (serviceParam) {
        // Highlight specific service
        setTimeout(() => {
            const serviceCards = document.querySelectorAll('.pricing-card');
            serviceCards.forEach(card => {
                const cardTitle = card.querySelector('h3').textContent.toLowerCase();
                if (cardTitle.includes(serviceParam.toLowerCase())) {
                    card.style.border = '2px solid var(--secondary-color)';
                    card.style.boxShadow = '0 10px 30px rgba(212, 165, 116, 0.3)';
                    
                    // Scroll to the card
                    setTimeout(() => {
                        card.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }, 500);
                }
            });
        }, 1000);
    }
    
    // Initialize with small client by default
    const defaultTab = document.querySelector('[data-client="small"]');
    if (defaultTab && !clientParam) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            updateClientDetails('small');
            updatePricingPackages('small');
        }, 100);
    }
    
    // Table row hover effects
    const tableRows = document.querySelectorAll('.table-row:not(.table-header)');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '5px 0 15px rgba(139, 90, 60, 0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Smooth scroll to sections when clicking nav links
    const pricingNavLinks = document.querySelectorAll('a[href*="#"]');
    
    pricingNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.includes('#') && !href.startsWith('#')) {
                // External link with hash
                return;
            }
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const selectorHeight = document.querySelector('.client-selector')?.offsetHeight || 0;
                const offset = headerHeight + selectorHeight + 20;
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading animation for package switches
    function showPackageLoader(show = true) {
        const existingLoader = document.querySelector('.package-loader');
        
        if (show && !existingLoader) {
            const loader = document.createElement('div');
            loader.className = 'package-loader';
            loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Načítavam balíčky...';
            loader.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                z-index: 100;
                color: var(--primary-color);
                font-weight: 600;
            `;
            
            const pricingGrid = document.getElementById('pricing-grid');
            pricingGrid.style.position = 'relative';
            pricingGrid.appendChild(loader);
        } else if (!show && existingLoader) {
            existingLoader.remove();
        }
    }
    
    // Add package comparison functionality
    let selectedPackages = [];
    
    function togglePackageComparison(packageElement, packageData) {
        const index = selectedPackages.findIndex(p => p.name === packageData.name);
        
        if (index > -1) {
            // Remove from comparison
            selectedPackages.splice(index, 1);
            packageElement.classList.remove('comparing');
        } else if (selectedPackages.length < 3) {
            // Add to comparison
            selectedPackages.push(packageData);
            packageElement.classList.add('comparing');
        } else {
            showNotification('Môžete porovnať maximálne 3 balíčky', 'warning');
        }
        
        updateComparisonBar();
    }
    
    function updateComparisonBar() {
        let comparisonBar = document.querySelector('.comparison-bar');
        
        if (selectedPackages.length > 0) {
            if (!comparisonBar) {
                comparisonBar = document.createElement('div');
                comparisonBar.className = 'comparison-bar';
                comparisonBar.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--primary-color);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 25px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                    z-index: 1000;
                    animation: slideUp 0.3s ease;
                `;
                document.body.appendChild(comparisonBar);
            }
            
            comparisonBar.innerHTML = `
                <span>Porovnávam ${selectedPackages.length} balíčkov</span>
                <button onclick="showComparison()" style="background: var(--secondary-color); color: var(--text-dark); border: none; padding: 5px 15px; border-radius: 15px; margin-left: 15px; cursor: pointer;">
                    Porovnať
                </button>
                <button onclick="clearComparison()" style="background: transparent; color: white; border: 1px solid white; padding: 5px 10px; border-radius: 15px; margin-left: 10px; cursor: pointer;">
                    Zrušiť
                </button>
            `;
        } else if (comparisonBar) {
            comparisonBar.remove();
        }
    }
    
    // Global functions for comparison
    window.showComparison = function() {
        // Implementation for showing comparison modal
        console.log('Showing comparison for:', selectedPackages);
        showNotification('Funkcia porovnania bude dostupná čoskoro', 'info');
    };
    
    window.clearComparison = function() {
        selectedPackages = [];
        document.querySelectorAll('.pricing-card.comparing').forEach(card => {
            card.classList.remove('comparing');
        });
        updateComparisonBar();
    };
    
    // Add comparison styles
    const comparisonStyles = document.createElement('style');
    comparisonStyles.textContent = `
        @keyframes slideUp {
            from {
                transform: translateX(-50%) translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        .pricing-card.comparing {
            border-color: var(--secondary-color) !important;
            box-shadow: 0 10px 30px rgba(212, 165, 116, 0.3) !important;
        }
        
        .pricing-card.comparing::after {
            content: '✓ Porovnávam';
            position: absolute;
            top: 10px;
            left: 10px;
            background: var(--secondary-color);
            color: var(--text-dark);
            padding: 5px 10px;
            border-radius: 10px;
            font-size: 0.8rem;
            font-weight: bold;
        }
    `;
    document.head.appendChild(comparisonStyles);
    
    console.log('Pricing page functionality initialized');
});

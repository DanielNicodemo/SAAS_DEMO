
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');


window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});


class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dotsContainer = document.querySelector('.carousel-dots');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.setupArrows();
        this.setupTouch();
        this.startAutoPlay();
    }
    
    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = document.querySelectorAll('.carousel-dot');
    }
    
    setupArrows() {
        const leftArrow = document.querySelector('.carousel-arrow-left');
        const rightArrow = document.querySelector('.carousel-arrow-right');
        
        leftArrow.addEventListener('click', () => this.prevSlide());
        rightArrow.addEventListener('click', () => this.nextSlide());
    }
    
    setupTouch() {
        const carousel = document.querySelector('.hero-carousel');
        
        carousel.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }
    
    handleSwipe() {
        if (this.touchStartX - this.touchEndX > 50) {
            this.nextSlide();
        } else if (this.touchEndX - this.touchStartX > 50) {
            this.prevSlide();
        }
    }
    
    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
        
        this.resetAutoPlay();
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }
    
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }
    
    startAutoPlay() {
        this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    resetAutoPlay() {
        clearInterval(this.slideInterval);
        this.startAutoPlay();
    }
}


const heroCarousel = new HeroCarousel();


const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');

const produtosInfo = {
    basico: {
        titulo: 'Insulfilm Básico',
        descricao: 'Solução econômica e eficiente para proteção do seu veículo',
        caracteristicas: [
            'Bloqueio de 60% dos raios UV',
            'Redução de 40% do calor interno',
            'Garantia de 1 ano contra defeitos',
            'Instalação profissional incluída',
            'Tonalidades: 5%, 20%, 35%, 50%',
            'Ideal para uso diário'
        ],
        preco: 'R$ 299'
    },
    ceramico: {
        titulo: 'Insulfilm Cerâmico',
        descricao: 'Tecnologia cerâmica de ponta para máximo conforto térmico',
        caracteristicas: [
            'Bloqueio de 99% dos raios UV',
            'Redução de 70% do calor interno',
            'Tecnologia de nanocerâmica',
            'Garantia de 3 anos',
            'Não interfere em sinais eletrônicos',
            'Alta durabilidade e resistência',
            'Tonalidades: 5%, 20%, 35%, 50%, 70%'
        ],
        preco: 'R$ 599'
    },
    premium: {
        titulo: 'Insulfilm Premium',
        descricao: 'A melhor escolha para quem busca qualidade superior',
        caracteristicas: [
            'Bloqueio de 99% dos raios UV',
            'Redução de 80% do calor interno',
            'Camada antirrisco',
            'Garantia de 5 anos',
            'Tecnologia multicamadas',
            'Resistência superior a impactos',
            'Acabamento premium',
            'Instalação VIP'
        ],
        preco: 'R$ 899'
    },
    antiestilhaco: {
        titulo: 'Insulfilm Antiestilhaço',
        descricao: 'Segurança máxima para você e sua família',
        caracteristicas: [
            'Bloqueio de 99% dos raios UV',
            'Película de alta resistência',
            'Protege contra tentativas de arrombamento',
            'Mantém vidro intacto em caso de impacto',
            'Garantia de 3 anos',
            'Certificação de segurança',
            'Ideal para segurança patrimonial'
        ],
        preco: 'R$ 799'
    },
    ppf: {
        titulo: 'Película PPF (Paint Protection Film)',
        descricao: 'Proteção transparente de altíssima resistência para a pintura do seu veículo',
        caracteristicas: [
            'Proteção contra pedriscos, arranhões e riscos de chaves',
            'Propriedade autorregenerativa (Self-Healing com calor)',
            'Brilho espelhado e acabamento profundo de showroom',
            'Efeito hidrofóbico (repulsão de água e sujeira)',
            'Garantia de até 10 anos contra amarelamento',
            'Preserva a pintura original e o valor de revenda'
        ],
        preco: 'R$ 1.499'
    },
    kit_instalacao: {
        titulo: 'Kit de Instalação de Insulfilm e PPF',
        descricao: 'NEWISHTOOL Kit de aplicação de película de janela, ferramentas de instalação de matiz de carro com frasco de pulverização, espátula de feltro PPF, raspador de feltro para veículos, ferramenta de instalação de película protetora de vidro, kit de envoltório de vinil, kit de ferramentas de tingimento.',
        caracteristicas: [
            'Frasco de pulverização (borrifador profissional)',
            'Espátula de feltro suave especial para PPF e vinil',
            'Raspador de feltro para remoção de bolhas sem arranhar',
            'Ferramenta de instalação de película protetora de vidro',
            'Kit completo para envoltório de vinil e tingimento',
            'Ferramentas de alta precisão para aplicação perfeita'
        ],
        preco: 'R$ 149'
    }
};


document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', () => {
        const produtoKey = button.getAttribute('data-modal');
        const produto = produtosInfo[produtoKey];
        
        if (produto) {
            modalBody.innerHTML = `
                <h3>${produto.titulo}</h3>
                <p>${produto.descricao}</p>
                <h4 style="margin-top: 20px; color: var(--dark-color);">Características:</h4>
                <ul>
                    ${produto.caracteristicas.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <div style="margin-top: 25px; font-size: 1.5rem; color: var(--primary-color); font-weight: bold;">
                    A partir de ${produto.preco}
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 25px;">
                    <a href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre o ${produto.titulo}" 
                       class="btn btn-primary" 
                       target="_blank" 
                       rel="noopener"
                       style="width: 100%; justify-content: center;">
                        <i class="fab fa-whatsapp"></i> Solicitar Orçamento
                    </a>
                    <button type="button" 
                            class="btn btn-secondary btn-modal-zoom-trigger" 
                            style="width: 100%; justify-content: center; gap: 8px;">
                        <i class="fas fa-search-plus"></i> Ampliar / Ver em Zoom 2D
                    </button>
                </div>
            `;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            const modalZoomBtn = modalBody.querySelector('.btn-modal-zoom-trigger');
            if (modalZoomBtn) {
                modalZoomBtn.addEventListener('click', () => {
                    modal.classList.remove('active');
                    if (window.interactiveZoomModal) {
                        window.interactiveZoomModal.open();
                    }
                });
            }
        }
    });
});


modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});


class ComparisonSlider {
    constructor() {
        this.container = document.getElementById('comparisonContainer') || document.querySelector('.comparison-container');
        this.handle = document.getElementById('sliderHandle') || document.querySelector('.comparison-slider-handle');
        this.beforeImage = document.getElementById('imgBefore') || document.querySelector('.comparison-before');
        this.afterWrapper = document.getElementById('afterWrapper') || document.querySelector('.comparison-after-wrapper');
        this.afterImage = document.getElementById('imgAfter') || document.querySelector('.comparison-after');
        this.tintOverlayLayer = document.getElementById('tintOverlayLayer');
        this.ppfGlossOverlay = document.getElementById('ppfGlossOverlay');
        this.beforeBadge = document.querySelector('.badge-before');
        this.afterBadge = document.getElementById('comparisonAfterBadge');
        
        this.typeButtons = document.querySelectorAll('.comparison-type-btn');
        this.angleButtons = document.querySelectorAll('.angle-btn');
        this.carSelect = document.getElementById('carSelect');
        this.archSelect = document.getElementById('archSelect');
        this.ppfSelect = document.getElementById('ppfSelect');
        this.tintCards = document.querySelectorAll('.tint-card');
        this.carModelSelector = document.getElementById('carModelSelector');
        this.archModelSelector = document.getElementById('archModelSelector');
        this.ppfModelSelector = document.getElementById('ppfModelSelector');
        this.angleSelectorRow = document.getElementById('angleSelectorRow');
        this.tintSelectorSection = document.querySelector('.tint-selector-section');
        this.ppfInfoSection = document.getElementById('ppfInfoSection');

        this.imageDB = {
            'haval': {
                'lateral': {
                    'Original': 'images/antes-depois/carros/01_haval_visao_lateral.jfif',
                    'G70': 'images/antes-depois/carros/01_haval_visao_lateral G70.jfif',
                    'G50': 'images/antes-depois/carros/01_haval_visao_lateral G50.jfif',
                    'G35': 'images/antes-depois/carros/01_haval_visao_lateral G35.jfif',
                    'G20': 'images/antes-depois/carros/01_haval_visao_lateral G20.jfif',
                    'G5':  'images/antes-depois/carros/01_haval_visao_lateral G5.jfif'
                },
                'frente': {
                    'Original': 'images/antes-depois/carros/01_haval_visao_frontal.jfif',
                    'G70': 'images/antes-depois/carros/01_haval_visao_frontal G70.jfif',
                    'G50': 'images/antes-depois/carros/01_haval_visao_frontal G50.jfif',
                    'G35': 'images/antes-depois/carros/01_haval_visao_frontal G35.jfif',
                    'G20': 'images/antes-depois/carros/01_haval_visao_frontal G20.jfif',
                    'G5':  'images/antes-depois/carros/01_haval_visao_frontal G5.jfif'
                },
                'traseira': {
                    'Original': 'images/antes-depois/carros/01_haval_visao_traseira.jfif',
                    'G70': 'images/antes-depois/carros/01_haval_visao_traseira G70.jfif',
                    'G50': 'images/antes-depois/carros/01_haval_visao_traseira G50.jfif',
                    'G35': 'images/antes-depois/carros/01_haval_visao_traseira G35.jfif',
                    'G20': 'images/antes-depois/carros/01_haval_visao_traseira G20.jfif',
                    'G5':  'images/antes-depois/carros/01_haval_visao_traseira G5.jfif'
                },
                'interna': {
                    'Original': 'images/antes-depois/carros/visão motorista HAVAL.jpeg',
                    'G70': 'images/antes-depois/carros/visão motorista HAVAL G70.jpeg',
                    'G50': 'images/antes-depois/carros/visão motorista HAVAL G50.png',
                    'G35': 'images/antes-depois/carros/visão motorista HAVAL G35.jpeg',
                    'G20': 'images/antes-depois/carros/visão motorista HAVAL G20.jpeg',
                    'G5':  'images/antes-depois/carros/visão motorista HAVAL G5.jfif'
                }
            },
            'jetta': {
                'lateral': {
                    'Original': 'images/antes-depois/carros/05_jetta_visao_lateral.jfif',
                    'G70': 'images/antes-depois/carros/05_jetta_visao_lateral G70.jfif',
                    'G50': 'images/antes-depois/carros/05_jetta_visao_lateral G50.jfif',
                    'G35': 'images/antes-depois/carros/05_jetta_visao_lateral G35.jfif',
                    'G20': 'images/antes-depois/carros/05_jetta_visao_lateral G20.jfif',
                    'G5':  'images/antes-depois/carros/05_jetta_visao_lateral G5.jfif'
                },
                'frente': {
                    'Original': 'images/antes-depois/carros/06_jetta_visao_frontal.jfif',
                    'G70': 'images/antes-depois/carros/06_jetta_visao_frontal G70.jfif',
                    'G50': 'images/antes-depois/carros/06_jetta_visao_frontal G50.jfif',
                    'G35': 'images/antes-depois/carros/06_jetta_visao_frontal G35.jfif',
                    'G20': 'images/antes-depois/carros/06_jetta_visao_frontal G20.jfif',
                    'G5':  'images/antes-depois/carros/06_jetta_visao_frontal G5.jfif'
                },
                'traseira': {
                    'Original': 'images/antes-depois/carros/07_jetta_visaotraseiral sem filme.jfif',
                    'G70': 'images/antes-depois/carros/07_jetta_visaotraseiral G70.jfif',
                    'G50': 'images/antes-depois/carros/07_jetta_visaotraseiral G50.jfif',
                    'G35': 'images/antes-depois/carros/07_jetta_visaotraseiral G35.jfif',
                    'G20': 'images/antes-depois/carros/07_jetta_visaotraseiral G20.jfif',
                    'G5':  'images/antes-depois/carros/07_jetta_visaotraseiral  G5.jfif'
                },
                'interna': {
                    'Original': 'images/antes-depois/carros/08_jetta_visao_motorista.jfif',
                    'G70': 'images/antes-depois/carros/08_jetta_visao_motorista G70.jpeg',
                    'G50': 'images/antes-depois/carros/08_jetta_visao_motorista G50.jpeg',
                    'G35': 'images/antes-depois/carros/08_jetta_visao_motorista G35.jpeg',
                    'G20': 'images/antes-depois/carros/08_jetta_visao_motorista G20.jpeg',
                    'G5':  'images/antes-depois/carros/08_jetta_visao_motorista G5.jpeg'
                }
            }
        };

        this.windowClipDB = {
            'haval': {
                'lateral':  'polygon(35% 48%, 44% 36%, 77% 36%, 81% 42%, 78% 48%)',
                'frente':   'polygon(34% 43%, 36% 29%, 64% 29%, 66% 43%)',
                'traseira': 'polygon(33% 43%, 36% 31%, 64% 31%, 67% 43%)',
                'interna':  'polygon(20% 62%, 22% 16%, 66% 16%, 80% 62%)'
            },
            'jetta': {
                'lateral':  'polygon(34% 48%, 44% 36%, 76% 36%, 79% 43%, 76% 48%)',
                'frente':   'polygon(34% 43%, 36% 29%, 64% 29%, 66% 43%)',
                'traseira': 'polygon(33% 43%, 36% 30%, 64% 30%, 67% 43%)',
                'interna':  'polygon(20% 62%, 22% 16%, 66% 16%, 80% 62%)'
            }
        };

        this.archImageDB = {
            'residencia1': {
                'Original': 'images/antes-depois/arquitetura/residencia_1.png',
                'G70': 'images/antes-depois/arquitetura/residencia_1 G70.jfif',
                'G50': 'images/antes-depois/arquitetura/residencia_1 G50.jfif',
                'G35': 'images/antes-depois/arquitetura/residencia_1 G35.jfif',
                'G20': 'images/antes-depois/arquitetura/residencia_1 G20.jfif',
                'G5':  'images/antes-depois/arquitetura/residencia_1 G5.jfif'
            },
            'residencia2': {
                'Original': 'images/antes-depois/arquitetura/residencia_2.png',
                'G70': 'images/antes-depois/arquitetura/residencia 2 G70.jfif',
                'G50': 'images/antes-depois/arquitetura/residencia 2 G50.jfif',
                'G35': 'images/antes-depois/arquitetura/residencia 2 G35.jfif',
                'G20': 'images/antes-depois/arquitetura/residencia 2 G20.jpg',
                'G5':  'images/antes-depois/arquitetura/residencia 2 G20.jpg'
            },
            'empresa1': {
                'Original': 'images/antes-depois/arquitetura/empresa_1.jpeg',
                'G70': 'images/antes-depois/arquitetura/Empresa_1 G70.jfif',
                'G50': 'images/antes-depois/arquitetura/Empresa_1 G50.jfif',
                'G35': 'images/antes-depois/arquitetura/empresa_1 G35.jfif',
                'G20': 'images/antes-depois/arquitetura/Empresa_1 G20.jfif',
                'G5':  'images/antes-depois/arquitetura/Empresa_1 G5.jfif'
            },
            'empresa2': {
                'Original': 'images/antes-depois/arquitetura/empresa_2.jfif',
                'G70': 'images/antes-depois/arquitetura/empresa_2 G70.jfif',
                'G50': 'images/antes-depois/arquitetura/empresa_2G50.jfif',
                'G35': 'images/antes-depois/arquitetura/empresa_2 G35.jfif',
                'G20': 'images/antes-depois/arquitetura/empresa_2 G20.jfif',
                'G5':  'images/antes-depois/arquitetura/empresa_2 G5 (3).jfif'
            }
        };

        this.archClipDB = {
            'residencia1': 'polygon(13% 36%, 70% 36%, 70% 78%, 13% 78%)',
            'residencia2': 'polygon(0% 28%, 78% 28%, 78% 56%, 0% 56%)',
            'empresa1':    'polygon(3% 58%, 35% 46%, 100% 40%, 100% 88%, 0% 84%)',
            'empresa2':    'polygon(9% 35%, 92% 35%, 92% 79%, 9% 79%)'
        };

        this.ppfImageDB = {
            'renault': {
                'lateral':  'images/antes-depois/PPF/01l_visao_lateral.png',
                'frente':   'images/antes-depois/PPF/02_visao_frontal.png',
                'traseira': 'images/antes-depois/PPF/03_visao_traseira.png'
            },
            'spark': {
                'lateral':  'images/antes-depois/PPF/01_spark_visao_lateral.png',
                'frente':   'images/antes-depois/PPF/02_spark_visao_frontal.png',
                'traseira': 'images/antes-depois/PPF/03_spark_visao_traseira.png'
            }
        };

        this.state = {
            type: 'automotivo',
            car: 'haval',
            angle: 'lateral',
            arch: 'residencia1',
            ppfCar: 'renault',
            tintLevel: 'G70',
            tintRgba: 'rgba(0,0,0,0.3)'
        };

        this.isDragging = false;
        
        if (this.container && this.handle && this.beforeImage && this.afterImage) {
            this.init();
        }
    }

    init() {
        const startDrag = (e) => {
            this.isDragging = true;
            this.handleMove(e);
        };

        const stopDrag = () => {
            this.isDragging = false;
        };

        const onMove = (e) => {
            if (!this.isDragging) return;
            this.handleMove(e);
        };

        if (this.handle) {
            this.handle.addEventListener('mousedown', startDrag);
            this.handle.addEventListener('touchstart', startDrag, { passive: true });
        }

        if (this.container) {
            this.container.addEventListener('mousedown', startDrag);
            this.container.addEventListener('touchstart', startDrag, { passive: true });
        }

        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('mousemove', onMove);
        document.addEventListener('touchend', stopDrag);
        document.addEventListener('touchmove', onMove, { passive: true });

        window.addEventListener('resize', () => this.resetSlider());

        this.setupEventListeners();
        this.updateView();
    }

    setupEventListeners() {
        const internaAngleBtn = document.querySelector('[data-angle="interna"]');

        // Type Buttons (Automotivo / Arquitetura / PPF)
        this.typeButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const type = btn.getAttribute('data-comparison-type');
                if (!type || type === this.state.type) return;

                this.state.type = type;
                this.typeButtons.forEach((b) => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                if (this.state.type === 'automotivo') {
                    if (this.carModelSelector) this.carModelSelector.style.display = 'flex';
                    if (this.archModelSelector) this.archModelSelector.style.display = 'none';
                    if (this.ppfModelSelector) this.ppfModelSelector.style.display = 'none';
                    if (this.angleSelectorRow) this.angleSelectorRow.style.display = 'flex';
                    if (internaAngleBtn) internaAngleBtn.style.display = 'inline-flex';
                    if (this.tintSelectorSection) this.tintSelectorSection.style.display = 'block';
                    if (this.ppfInfoSection) this.ppfInfoSection.style.display = 'none';
                } else if (this.state.type === 'arquitetura') {
                    if (this.carModelSelector) this.carModelSelector.style.display = 'none';
                    if (this.archModelSelector) this.archModelSelector.style.display = 'flex';
                    if (this.ppfModelSelector) this.ppfModelSelector.style.display = 'none';
                    if (this.angleSelectorRow) this.angleSelectorRow.style.display = 'none';
                    if (this.tintSelectorSection) this.tintSelectorSection.style.display = 'block';
                    if (this.ppfInfoSection) this.ppfInfoSection.style.display = 'none';
                } else if (this.state.type === 'ppf') {
                    if (this.carModelSelector) this.carModelSelector.style.display = 'none';
                    if (this.archModelSelector) this.archModelSelector.style.display = 'none';
                    if (this.ppfModelSelector) this.ppfModelSelector.style.display = 'flex';
                    if (this.angleSelectorRow) this.angleSelectorRow.style.display = 'flex';
                    if (internaAngleBtn) internaAngleBtn.style.display = 'none';
                    if (this.tintSelectorSection) this.tintSelectorSection.style.display = 'none';
                    if (this.ppfInfoSection) this.ppfInfoSection.style.display = 'block';

                    if (this.state.angle === 'interna') {
                        this.state.angle = 'lateral';
                        this.angleButtons.forEach((b) => {
                            b.classList.toggle('active', b.getAttribute('data-angle') === 'lateral');
                        });
                    }
                }

                this.updateView();
            });
        });

        // Dropdowns
        if (this.carSelect) {
            this.carSelect.addEventListener('change', (e) => {
                this.state.car = e.target.value;
                this.updateView();
            });
        }

        if (this.archSelect) {
            this.archSelect.addEventListener('change', (e) => {
                this.state.arch = e.target.value;
                this.updateView();
            });
        }

        if (this.ppfSelect) {
            this.ppfSelect.addEventListener('change', (e) => {
                this.state.ppfCar = e.target.value;
                this.updateView();
            });
        }

        // Angle Buttons
        this.angleButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const angle = btn.getAttribute('data-angle');
                if (!angle || angle === this.state.angle) return;

                this.state.angle = angle;
                this.angleButtons.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');
                this.updateView();
            });
        });

        // Tint Cards
        this.tintCards.forEach((card) => {
            card.addEventListener('click', () => {
                const level = card.getAttribute('data-comparison-level');
                const rgba = card.getAttribute('data-rgba') || 'rgba(0,0,0,0.3)';

                this.state.tintLevel = level;
                this.state.tintRgba = rgba;

                this.tintCards.forEach((c) => c.classList.remove('active'));
                card.classList.add('active');
                this.updateView();
            });
        });
    }

    updateView() {
        if (this.state.type === 'automotivo') {
            const carViews = this.imageDB[this.state.car] || this.imageDB['haval'];
            const angleObj = carViews[this.state.angle] || carViews['lateral'];
            
            const beforeSrc = (typeof angleObj === 'object') ? (angleObj['Original'] || angleObj['base']) : angleObj;
            let afterSrc = beforeSrc;

            if (typeof angleObj === 'object') {
                afterSrc = angleObj[this.state.tintLevel] || angleObj['G70'] || beforeSrc;
            }

            this.beforeImage.src = beforeSrc;
            this.beforeImage.alt = `Veículo ${this.state.car} (${this.state.angle}) sem insulfilm`;
            this.beforeImage.style.filter = 'none';

            this.afterImage.src = afterSrc;
            this.afterImage.alt = `Veículo ${this.state.car} (${this.state.angle}) com insulfilm ${this.state.tintLevel}`;

            if (this.tintOverlayLayer) {
                if (afterSrc !== beforeSrc) {
                    this.tintOverlayLayer.style.display = 'none';
                } else {
                    const carClips = this.windowClipDB[this.state.car] || this.windowClipDB['haval'];
                    const clipVal = carClips[this.state.angle] || carClips['lateral'];
                    this.tintOverlayLayer.style.display = 'block';
                    this.tintOverlayLayer.style.backgroundColor = this.state.tintRgba;
                    this.tintOverlayLayer.style.clipPath = clipVal;
                }
            }

            if (this.beforeBadge) this.beforeBadge.textContent = 'Sem Insulfilm';
            if (this.afterBadge) this.afterBadge.textContent = `Com Insulfilm (${this.state.tintLevel})`;
            if (this.ppfGlossOverlay) this.ppfGlossOverlay.style.display = 'none';
        } else if (this.state.type === 'arquitetura') {
            const archKey = this.state.arch || 'residencia1';
            const archObj = this.archImageDB[archKey] || this.archImageDB['residencia1'];

            const beforeSrc = (typeof archObj === 'object') ? (archObj['Original'] || archObj['base']) : archObj;
            let afterSrc = beforeSrc;

            if (typeof archObj === 'object') {
                afterSrc = archObj[this.state.tintLevel] || archObj['G70'] || beforeSrc;
            }

            this.beforeImage.src = beforeSrc;
            this.beforeImage.alt = `Projeto Arquitetura (${archKey}) sem insulfilm`;
            this.beforeImage.style.filter = 'none';

            this.afterImage.src = afterSrc;
            this.afterImage.alt = `Projeto Arquitetura (${archKey}) com insulfilm ${this.state.tintLevel}`;

            if (this.tintOverlayLayer) {
                if (afterSrc !== beforeSrc) {
                    this.tintOverlayLayer.style.display = 'none';
                } else {
                    const clipVal = this.archClipDB[archKey] || this.archClipDB['residencia1'];
                    this.tintOverlayLayer.style.display = 'block';
                    this.tintOverlayLayer.style.backgroundColor = this.state.tintRgba;
                    this.tintOverlayLayer.style.clipPath = clipVal;
                }
            }

            if (this.beforeBadge) this.beforeBadge.textContent = 'Sem Insulfilm';
            if (this.afterBadge) this.afterBadge.textContent = `Com Insulfilm (${this.state.tintLevel})`;
            if (this.ppfGlossOverlay) this.ppfGlossOverlay.style.display = 'none';
        } else if (this.state.type === 'ppf') {
            const ppfCarViews = this.ppfImageDB[this.state.ppfCar] || this.ppfImageDB['renault'];
            const imgSrc = ppfCarViews[this.state.angle] || ppfCarViews['lateral'];

            this.beforeImage.src = imgSrc;
            this.beforeImage.alt = `Veículo PPF (${this.state.ppfCar}) sem PPF`;
            this.beforeImage.style.filter = 'none';

            this.afterImage.src = imgSrc;
            this.afterImage.alt = `Veículo PPF (${this.state.ppfCar}) com PPF aplicado`;
            this.afterImage.style.filter = 'brightness(1.06) contrast(1.08)';

            if (this.tintOverlayLayer) {
                this.tintOverlayLayer.style.display = 'none';
            }

            if (this.ppfGlossOverlay) {
                this.ppfGlossOverlay.style.display = 'block';
            }

            if (this.beforeBadge) this.beforeBadge.textContent = 'ANTES: PINTURA ORIGINAL';
            if (this.afterBadge) this.afterBadge.textContent = 'DEPOIS: COM PPF (BRILHO MOLHADO)';
        }

        this.resetSlider();
        if (window.interactiveZoomModal && window.interactiveZoomModal.isOpen) {
            window.interactiveZoomModal.syncView();
        }
    }

    resetSlider() {
        if (this.handle) {
            this.handle.style.left = '50%';
        }
        if (this.afterWrapper) {
            this.afterWrapper.style.clipPath = 'inset(0 0 0 50%)';
            this.afterWrapper.style.webkitClipPath = 'inset(0 0 0 50%)';
        }
    }

    handleMove(e) {
        if (!this.isDragging) return;

        const rect = this.container.getBoundingClientRect();
        let clientX = e.clientX;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
        }

        let x = clientX - rect.left;
        x = Math.max(0, Math.min(x, rect.width));

        const percentage = (x / rect.width) * 100;

        if (this.handle) {
            this.handle.style.left = `${percentage}%`;
        }

        if (this.afterWrapper) {
            this.afterWrapper.style.clipPath = `inset(0 0 0 ${percentage}%)`;
            this.afterWrapper.style.webkitClipPath = `inset(0 0 0 ${percentage}%)`;
        }
    }
}




const comparisonSlider = new ComparisonSlider();


class InteractiveZoomModal {
    constructor(comparisonSlider) {
        this.slider = comparisonSlider;
        this.modal = document.getElementById('zoomModal');
        this.triggerBtn = document.getElementById('zoomTriggerBtn');
        this.closeBtn = document.getElementById('zoomCloseBtn');
        this.headerCloseBtn = document.getElementById('zoomHeaderCloseBtn');
        this.viewport = document.getElementById('zoomModalViewport');
        this.stageWrapper = document.getElementById('zoomStageWrapper');
        this.zoomContainer = document.getElementById('zoomComparisonContainer');
        this.zoomImgBefore = document.getElementById('zoomImgBefore');
        this.zoomImgAfter = document.getElementById('zoomImgAfter');
        this.zoomAfterWrapper = document.getElementById('zoomAfterWrapper');
        this.zoomTintOverlayLayer = document.getElementById('zoomTintOverlayLayer');
        this.zoomPpfGlossOverlay = document.getElementById('zoomPpfGlossOverlay');
        this.zoomAfterBadge = document.getElementById('zoomComparisonAfterBadge');
        this.zoomSliderHandle = document.getElementById('zoomSliderHandle');

        this.zoomInBtn = document.getElementById('zoomInBtn');
        this.zoomOutBtn = document.getElementById('zoomOutBtn');
        this.zoomResetBtn = document.getElementById('zoomResetBtn');

        this.zoomTintPills = document.querySelectorAll('.zoom-tint-pill');
        this.zoomAnglePills = document.querySelectorAll('.zoom-angle-pill');
        this.zoomTypePills = document.querySelectorAll('.zoom-type-pill');
        this.zoomCarSelect = document.getElementById('zoomCarSelect');
        this.zoomArchSelect = document.getElementById('zoomArchSelect');
        this.zoomPpfSelect = document.getElementById('zoomPpfSelect');
        this.zoomSideTintRail = document.getElementById('zoomSideTintRail');

        this.isOpen = false;
        this.scale = 1.8;
        this.panX = 0;
        this.panY = 0;
        this.isPanning = false;
        this.startPanX = 0;
        this.startPanY = 0;
        this.isSliderDragging = false;

        if (this.modal && this.triggerBtn) {
            this.init();
        }
    }

    init() {
        this.triggerBtn.addEventListener('click', () => this.open());
        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
        if (this.headerCloseBtn) this.headerCloseBtn.addEventListener('click', () => this.close());

        if (this.zoomInBtn) this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        if (this.zoomOutBtn) this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        if (this.zoomResetBtn) this.zoomResetBtn.addEventListener('click', () => this.resetPan());

        // Model Dropdowns inside Zoom Toolbar
        if (this.zoomCarSelect) {
            this.zoomCarSelect.addEventListener('change', (e) => {
                const val = e.target.value;
                if (!this.slider) return;
                this.slider.state.car = val;
                if (this.slider.carSelect) this.slider.carSelect.value = val;
                this.slider.updateView();
            });
        }

        if (this.zoomArchSelect) {
            this.zoomArchSelect.addEventListener('change', (e) => {
                const val = e.target.value;
                if (!this.slider) return;
                this.slider.state.arch = val;
                if (this.slider.archSelect) this.slider.archSelect.value = val;
                this.slider.updateView();
            });
        }

        if (this.zoomPpfSelect) {
            this.zoomPpfSelect.addEventListener('change', (e) => {
                const val = e.target.value;
                if (!this.slider) return;
                this.slider.state.ppfCar = val;
                if (this.slider.ppfSelect) this.slider.ppfSelect.value = val;
                this.slider.updateView();
            });
        }

        // Floating Tint Pills Click inside Zoom Modal
        this.zoomTintPills.forEach(pill => {
            pill.addEventListener('click', () => {
                const tintLevel = pill.getAttribute('data-zoom-tint');
                if (!tintLevel || !this.slider) return;

                const rgbaMap = {
                    'G70': 'rgba(0,0,0,0.3)',
                    'G50': 'rgba(0,0,0,0.5)',
                    'G35': 'rgba(0,0,0,0.65)',
                    'G20': 'rgba(0,0,0,0.8)',
                    'G5':  'rgba(0,0,0,0.95)'
                };

                this.slider.state.tintLevel = tintLevel;
                this.slider.state.tintRgba = rgbaMap[tintLevel] || 'rgba(0,0,0,0.5)';

                if (this.slider.tintCards) {
                    this.slider.tintCards.forEach(c => {
                        c.classList.toggle('active', c.getAttribute('data-comparison-level') === tintLevel);
                    });
                }

                this.slider.updateView();
            });
        });

        // Floating Angle Pills Click inside Zoom Modal
        this.zoomAnglePills.forEach(pill => {
            pill.addEventListener('click', () => {
                const angle = pill.getAttribute('data-zoom-angle');
                if (!angle || !this.slider) return;

                this.slider.state.angle = angle;
                if (this.slider.angleButtons) {
                    this.slider.angleButtons.forEach(b => {
                        b.classList.toggle('active', b.getAttribute('data-angle') === angle);
                    });
                }

                this.slider.updateView();
            });
        });

        // Floating Type Pills Click inside Zoom Modal
        this.zoomTypePills.forEach(pill => {
            pill.addEventListener('click', () => {
                const type = pill.getAttribute('data-zoom-type');
                if (!type || !this.slider) return;

                const matchedTypeBtn = Array.from(this.slider.typeButtons || []).find(b => b.getAttribute('data-comparison-type') === type);
                if (matchedTypeBtn) {
                    matchedTypeBtn.click();
                } else {
                    this.slider.state.type = type;
                    this.slider.updateView();
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        if (this.viewport) {
            this.viewport.addEventListener('wheel', (e) => {
                if (!this.isOpen) return;
                e.preventDefault();
                if (e.deltaY < 0) {
                    this.zoomIn();
                } else {
                    this.zoomOut();
                }
            }, { passive: false });

            const startDrag = (e) => {
                if (!this.isOpen) return;
                const isHandle = e.target.closest('#zoomSliderHandle');
                const isToolbar = e.target.closest('#zoomTopToolbar') || e.target.closest('#zoomSideTintRail');
                if (isToolbar) return;

                if (isHandle) {
                    this.isSliderDragging = true;
                    this.handleSliderMove(e);
                } else {
                    this.isPanning = true;
                    this.viewport.classList.add('grabbing');
                    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                    this.startPanX = clientX - this.panX;
                    this.startPanY = clientY - this.startPanY;
                }
            };

            const onMove = (e) => {
                if (!this.isOpen) return;
                if (this.isSliderDragging) {
                    this.handleSliderMove(e);
                } else if (this.isPanning) {
                    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                    this.panX = clientX - this.startPanX;
                    this.panY = clientY - this.startPanY;
                    this.updateTransform();
                }
            };

            const stopDrag = () => {
                this.isPanning = false;
                this.isSliderDragging = false;
                if (this.viewport) this.viewport.classList.remove('grabbing');
            };

            this.viewport.addEventListener('mousedown', startDrag);
            this.viewport.addEventListener('touchstart', startDrag, { passive: true });

            document.addEventListener('mousemove', onMove);
            document.addEventListener('touchmove', onMove, { passive: true });

            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
        }
    }

    open() {
        this.isOpen = true;
        this.syncView();
        this.resetPan();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    syncView() {
        if (!this.slider) return;

        if (this.zoomImgBefore && this.slider.beforeImage) {
            this.zoomImgBefore.src = this.slider.beforeImage.src;
        }

        if (this.zoomImgAfter && this.slider.afterImage) {
            this.zoomImgAfter.src = this.slider.afterImage.src;
            this.zoomImgAfter.style.filter = this.slider.afterImage.style.filter || 'none';
        }

        if (this.zoomTintOverlayLayer && this.slider.tintOverlayLayer) {
            this.zoomTintOverlayLayer.style.display = this.slider.tintOverlayLayer.style.display;
            this.zoomTintOverlayLayer.style.backgroundColor = this.slider.tintOverlayLayer.style.backgroundColor;
            this.zoomTintOverlayLayer.style.clipPath = this.slider.tintOverlayLayer.style.clipPath;
        }

        if (this.zoomPpfGlossOverlay && this.slider.ppfGlossOverlay) {
            this.zoomPpfGlossOverlay.style.display = this.slider.ppfGlossOverlay.style.display;
        }

        if (this.zoomAfterBadge && this.slider.afterBadge) {
            this.zoomAfterBadge.textContent = this.slider.afterBadge.textContent;
        }

        if (this.slider.handle && this.zoomSliderHandle && this.zoomAfterWrapper) {
            const leftPos = this.slider.handle.style.left || '50%';
            this.zoomSliderHandle.style.left = leftPos;
            this.zoomAfterWrapper.style.clipPath = `inset(0 0 0 ${leftPos})`;
            this.zoomAfterWrapper.style.webkitClipPath = `inset(0 0 0 ${leftPos})`;
        }

        // Sync Floating Toolbar Pills & Dropdowns Active States
        const currentType = this.slider.state.type;
        const currentTint = this.slider.state.tintLevel;
        const currentAngle = this.slider.state.angle;

        if (this.zoomCarSelect) {
            this.zoomCarSelect.value = this.slider.state.car;
            this.zoomCarSelect.style.display = (currentType === 'automotivo') ? 'inline-block' : 'none';
        }

        if (this.zoomArchSelect) {
            this.zoomArchSelect.value = this.slider.state.arch;
            this.zoomArchSelect.style.display = (currentType === 'arquitetura') ? 'inline-block' : 'none';
        }

        if (this.zoomPpfSelect) {
            this.zoomPpfSelect.value = this.slider.state.ppfCar;
            this.zoomPpfSelect.style.display = (currentType === 'ppf') ? 'inline-block' : 'none';
        }

        if (this.zoomSideTintRail) {
            this.zoomSideTintRail.style.display = (currentType === 'ppf') ? 'none' : 'flex';
        }

        this.zoomTintPills.forEach(p => {
            p.classList.toggle('active', p.getAttribute('data-zoom-tint') === currentTint);
        });

        this.zoomAnglePills.forEach(p => {
            const pillAngle = p.getAttribute('data-zoom-angle');
            p.classList.toggle('active', pillAngle === currentAngle);
            if (currentType === 'ppf' && pillAngle === 'interna') {
                p.style.display = 'none';
            } else {
                p.style.display = 'inline-flex';
            }
        });

        this.zoomTypePills.forEach(p => {
            p.classList.toggle('active', p.getAttribute('data-zoom-type') === currentType);
        });
    }

    zoomIn() {
        this.scale = Math.min(this.scale + 0.35, 3.5);
        this.updateTransform();
    }

    zoomOut() {
        this.scale = Math.max(this.scale - 0.35, 1.0);
        this.updateTransform();
    }

    resetPan() {
        this.scale = 1.8;
        this.panX = 0;
        this.panY = 0;
        this.updateTransform();
    }

    updateTransform() {
        if (this.stageWrapper) {
            this.stageWrapper.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.scale})`;
        }
    }

    handleSliderMove(e) {
        if (!this.zoomContainer || !this.zoomSliderHandle || !this.zoomAfterWrapper) return;
        const rect = this.zoomContainer.getBoundingClientRect();
        let clientX = e.clientX;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
        }

        let x = clientX - rect.left;
        x = Math.max(0, Math.min(x, rect.width));

        const percentage = (x / rect.width) * 100;
        this.zoomSliderHandle.style.left = `${percentage}%`;
        this.zoomAfterWrapper.style.clipPath = `inset(0 0 0 ${percentage}%)`;
        this.zoomAfterWrapper.style.webkitClipPath = `inset(0 0 0 ${percentage}%)`;
    }
}

window.interactiveZoomModal = new InteractiveZoomModal(comparisonSlider);


class DepoimentosCarousel {
    constructor() {
        this.wrapper = document.querySelector('.depoimentos-wrapper');
        this.cards = document.querySelectorAll('.depoimento-card');
        this.leftArrow = document.querySelector('.depoimentos-arrow-left');
        this.rightArrow = document.querySelector('.depoimentos-arrow-right');
        this.currentIndex = 0;
        
        if (this.wrapper && this.cards.length > 0) {
            this.init();
        }
    }
    
    init() {
        if (this.leftArrow && this.rightArrow) {
            this.leftArrow.addEventListener('click', () => this.prev());
            this.rightArrow.addEventListener('click', () => this.next());
        }
        
       
        setInterval(() => this.next(), 5000);
        
       
        this.updateCardsPerView();
        window.addEventListener('resize', () => this.updateCardsPerView());
    }
    
    updateCardsPerView() {
        const width = window.innerWidth;
        if (width < 768) {
            this.cardsPerView = 1;
        } else if (width < 1024) {
            this.cardsPerView = 2;
        } else {
            this.cardsPerView = 3;
        }
    }
    
    next() {
        if (this.currentIndex < this.cards.length - this.cardsPerView) {
            this.currentIndex++;
            this.updatePosition();
        }
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updatePosition();
        }
    }
    
    updatePosition() {
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 30;
        const offset = -(this.currentIndex * (cardWidth + gap));
        this.wrapper.style.transform = `translateX(${offset}px)`;
    }
}


const depoimentosCarousel = new DepoimentosCarousel();

const contatoForm = document.getElementById('contatoForm');

contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const veiculo = document.getElementById('veiculo').value;
    const mensagem = document.getElementById('mensagem').value;
    
    let texto = `Olá! Meu nome é ${nome}.\n`;
    texto += `Telefone: ${telefone}\n`;
    texto += `Veículo: ${veiculo}`;
    
    if (mensagem) {
        texto += `\n\nMensagem: ${mensagem}`;
    }
    
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(texto)}`;
    window.open(whatsappUrl, '_blank');
    
    
    contatoForm.reset();
});


const telefoneInput = document.getElementById('telefone');
telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 11) {
        value = value.slice(0, 11);
    }
    
    if (value.length > 10) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else if (value.length > 0) {
        value = value.replace(/(\d{0,2})/, '($1');
    }
    
    e.target.value = value;
});


const lazyImages = document.querySelectorAll('img[loading="lazy"]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
    img.addEventListener('load', () => img.classList.add('loaded'));
});


const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');


document.querySelectorAll('.produto-card img, .promocao-card img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});


lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


document.querySelectorAll('.produto-card, .diferencial-card, .promocao-card, .depoimento-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(card);
});


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


window.addEventListener('resize', debounce(() => {
    depoimentosCarousel.updateCardsPerView();
}, 250));


const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => sectionObserver.observe(section));


document.addEventListener('keydown', (e) => {
    
    if (e.key === 'Escape') {
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    if (e.key === 'ArrowLeft') {
        heroCarousel.prevSlide();
    }
    if (e.key === 'ArrowRight') {
        heroCarousel.nextSlide();
    }
});

window.addEventListener('load', () => {
    const slides = document.querySelectorAll('.carousel-slide img');
    slides.forEach((img, index) => {
        if (index > 0) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = img.src;
            document.head.appendChild(preloadLink);
        }
    });
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('🚗 Insulfilm Premium - Landing Page carregada com sucesso!');
console.log('📱 WhatsApp configurado para: +55 11 99999-9999');
console.log('⚡ Todas as funcionalidades ativas');

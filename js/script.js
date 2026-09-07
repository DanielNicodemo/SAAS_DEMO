
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
                <a href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre o ${produto.titulo}" 
                   class="btn btn-primary" 
                   target="_blank" 
                   rel="noopener"
                   style="margin-top: 25px; width: 100%; justify-content: center;">
                    <i class="fab fa-whatsapp"></i> Solicitar Orçamento
                </a>
            `;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
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
        this.container = document.querySelector('.comparison-container');
        this.handle = document.querySelector('.comparison-slider-handle');
        this.beforeImage = document.querySelector('.comparison-before');
        this.afterImage = document.querySelector('.comparison-after');
        this.typeButtons = document.querySelectorAll('.comparison-type-btn');
        this.levelButtons = document.querySelectorAll('.comparison-level-btn');
        this.afterLabel = document.getElementById('comparisonAfterLabel');
        this.visibilityMap = {
            G5: 5,
            G20: 20,
            G35: 35,
            G50: 50,
            G70: 70
        };
        this.comparisonData = {
            carro: {
                beforeSrc: 'images/antes-depois/vermelho.jpg',
                beforeAlt: 'Carro sem insulfilm',
                levels: {
                    G5: {
                        src: 'images/antes-depois/vermelho_g5.jpg',
                        alt: 'Carro com insulfilm G5'
                    },
                    G20: {
                        src: 'images/antes-depois/vermelho_g20.jpeg',
                        alt: 'Carro com insulfilm G20'
                    },
                    G35: {
                        src: 'images/antes-depois/vermelho_g35.jpg',
                        alt: 'Carro com insulfilm G35'
                    },
                    G50: {
                        src: 'images/antes-depois/vermelho_g50.jpg',
                        alt: 'Carro com insulfilm G50'
                    },
                    G70: {
                        src: 'images/antes-depois/vermelho_g70.jpeg',
                        alt: 'Carro com insulfilm G70'
                    }
                }
            },
            casa: {
                beforeSrc: 'images/hero/casa.jpeg',
                beforeAlt: 'Casa sem insulfilm',
                levels: {
                    G5: {
                        src: 'images/hero/residencia.png',
                        alt: 'Casa com insulfilm G5'
                    },
                    G20: {
                        src: 'images/hero/residencia.png',
                        alt: 'Casa com insulfilm G20'
                    },
                    G35: {
                        src: 'images/hero/residencia.png',
                        alt: 'Casa com insulfilm G35'
                    },
                    G50: {
                        src: 'images/hero/residencia.png',
                        alt: 'Casa com insulfilm G50'
                    },
                    G70: {
                        src: 'images/hero/residencia.png',
                        alt: 'Casa com insulfilm G70'
                    }
                }
            }
        };
        this.currentType = 'carro';
        this.currentLevel = 'G5';
        this.isDragging = false;
        
        if (this.container && this.handle && this.beforeImage && this.afterImage) {
            this.init();
        }
    }
    
    init() {
        this.handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.isDragging = true;
        });
        document.addEventListener('mouseup', () => this.isDragging = false);
        document.addEventListener('mousemove', (e) => this.handleMove(e));
        
        // Touch events
        this.handle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.isDragging = true;
        }, { passive: false });
        document.addEventListener('touchend', () => this.isDragging = false);
        document.addEventListener('touchmove', (e) => this.handleMove(e));

        this.setupSelectors();
        this.updateComparisonView();
    }

    setupSelectors() {
        this.typeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedType = button.getAttribute('data-comparison-type');
                if (!selectedType || selectedType === this.currentType) return;

                this.currentType = selectedType;
                this.typeButtons.forEach((btn) => btn.classList.remove('active'));
                button.classList.add('active');
                this.updateComparisonView();
            });
        });

        this.levelButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedLevel = button.getAttribute('data-comparison-level');
                if (!selectedLevel || selectedLevel === this.currentLevel) return;

                this.currentLevel = selectedLevel;
                this.levelButtons.forEach((btn) => btn.classList.remove('active'));
                button.classList.add('active');
                this.updateComparisonView();
            });
        });
    }

    updateComparisonView() {
        const typeData = this.comparisonData[this.currentType];
        if (!typeData) return;

        const levelData = typeData.levels[this.currentLevel];
        if (!levelData) return;

        this.beforeImage.src = typeData.beforeSrc;
        this.beforeImage.alt = typeData.beforeAlt;
        this.afterImage.src = levelData.src;
        this.afterImage.alt = levelData.alt;

        const visibility = this.visibilityMap[this.currentLevel] || this.currentLevel.replace('G', '');
        if (this.afterLabel) {
            this.afterLabel.textContent = `Depois - ${this.currentLevel} (${visibility}% visibilidade)`;
        }

        this.resetSlider();
    }

    resetSlider() {
        this.handle.style.left = '50%';
        this.afterImage.style.clipPath = 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)';
    }
    
    handleMove(e) {
        if (!this.isDragging) return;
        
        const rect = this.container.getBoundingClientRect();
        let x;
        
        if (e.type === 'touchmove') {
            x = e.touches[0].clientX - rect.left;
        } else {
            x = e.clientX - rect.left;
        }
        
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        this.handle.style.left = `${percentage}%`;
        this.afterImage.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
    }
}


const comparisonSlider = new ComparisonSlider();


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

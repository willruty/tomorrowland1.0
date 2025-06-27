document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.highlight-card, .event-card, .artist-card, .stage-card, .contact-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    const heroSection = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');

    if (heroSection && heroBackground) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            if (scrolled < heroSection.offsetHeight) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    function updateVisitorCounter() {
        const counter = document.querySelector('#visitor-counter');
        if (counter) {
            const baseCount = 1847392;
            const randomIncrement = Math.floor(Math.random() * 5) + 1;
            const currentCount = baseCount + randomIncrement;
            counter.textContent = currentCount.toLocaleString('pt-BR');
        }
    }

    updateVisitorCounter();
    setInterval(updateVisitorCounter, 5000);

    let keySequence = [];
    const secretSequence = ['t', 'm', 'l'];

    document.addEventListener('keydown', function (e) {
        keySequence.push(e.key.toLowerCase());

        if (keySequence.length > secretSequence.length) {
            keySequence.shift();
        }

        if (keySequence.join('') === secretSequence.join('')) {
            showEasterEgg();
            keySequence = [];
        }
    });

    function showEasterEgg() {
        const easterEgg = document.createElement('div');
        easterEgg.innerHTML = '🎵 Você encontrou o Easter Egg do Tomorrowland! 🎭';
        easterEgg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff6b35, #f7931e);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            font-size: 1.2rem;
            font-weight: bold;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: bounce 0.6s ease;
        `;

        document.body.appendChild(easterEgg);

        setTimeout(() => {
            easterEgg.remove();
        }, 3000);

        console.log('🎉 Easter Egg ativado! Parabéns por descobrir o segredo do Tomorrowland!');
    }

    window.addEventListener('load', function () {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    window.showNotification = function (message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: bold;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    };

    window.formatNumber = function (num) {
        return num.toLocaleString('pt-BR');
    };

    window.validateEmail = function (email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    console.log('🎵 Tomorrowland Website - JavaScript carregado com sucesso!');
    console.log('✨ Dica: Digite "tml" para encontrar um Easter Egg!');
});

const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translate(-50%, -50%) translateY(0);
        }
        40% {
            transform: translate(-50%, -50%) translateY(-10px);
        }
        80% {
            transform: translate(-50%, -50%) translateY(-5px);
        }
    }
    
    .header.scrolled {
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(15px);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;

document.head.appendChild(style);
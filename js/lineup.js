document.addEventListener('DOMContentLoaded', function () {
    console.log('🎵 Lineup page - JavaScript carregado!');

    const filterButtons = document.querySelectorAll('.filter-btn');
    const artistCards = document.querySelectorAll('.artist-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedStage = this.getAttribute('data-stage');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            filterArtists(selectedStage);

            console.log(`Filtro aplicado: ${selectedStage}`);
        });
    });

    function filterArtists(stage) {
        artistCards.forEach(card => {
            const cardStage = card.classList.contains('mainstage') ? 'mainstage' :
                card.classList.contains('freedom') ? 'freedom' :
                    card.classList.contains('core') ? 'core' :
                        card.classList.contains('atmosphere') ? 'atmosphere' : 'other';

            if (stage === 'all' || cardStage === stage) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';

                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';

                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        updateArtistCounter(stage);
    }

    function updateArtistCounter(stage) {
        setTimeout(() => {
            const visibleArtists = document.querySelectorAll('.artist-card[style*="opacity: 1"], .artist-card:not([style])');
            const counter = visibleArtists.length;

            let counterElement = document.querySelector('.artist-counter');
            if (!counterElement) {
                counterElement = document.createElement('div');
                counterElement.className = 'artist-counter';
                counterElement.style.cssText = `
                    text-align: center;
                    margin: 2rem 0;
                    font-size: 1.1rem;
                    color: #666;
                    font-weight: bold;
                `;

                const lineupSection = document.querySelector('.all-artists');
                if (lineupSection) {
                    lineupSection.appendChild(counterElement);
                }
            }

            const stageText = stage === 'all' ? 'todos os palcos' :
                stage === 'mainstage' ? 'MainStage' :
                    stage === 'freedom' ? 'Freedom' :
                        stage === 'core' ? 'Core' :
                            stage === 'atmosphere' ? 'Atmosphere' : stage;

            counterElement.innerHTML = `
                📊 Mostrando <strong>${counter} artistas</strong> de ${stageText}
            `;
        }, 350);
    }

    function createSearchBox() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            text-align: center;
            margin: 2rem 0;
        `;

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = '🔍 Buscar artista...';
        searchInput.className = 'artist-search';
        searchInput.style.cssText = `
            width: 300px;
            max-width: 100%;
            padding: 12px 20px;
            border: 2px solid #ddd;
            border-radius: 25px;
            font-size: 1rem;
            transition: all 0.3s ease;
        `;

        searchContainer.appendChild(searchInput);

        const stageFilters = document.querySelector('.stage-filters');
        if (stageFilters) {
            stageFilters.parentNode.insertBefore(searchContainer, stageFilters);
        }

        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase().trim();
            searchArtists(searchTerm);
        });

        searchInput.addEventListener('focus', function () {
            this.style.borderColor = '#ff6b35';
            this.style.boxShadow = '0 0 10px rgba(255, 107, 53, 0.3)';
        });

        searchInput.addEventListener('blur', function () {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    }

    function searchArtists(searchTerm) {
        artistCards.forEach(card => {
            const artistName = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
            const artistGenre = card.querySelector('.artist-genre') ? card.querySelector('.artist-genre').textContent.toLowerCase() : '';

            const matchesSearch = searchTerm === '' ||
                artistName.includes(searchTerm) ||
                artistGenre.includes(searchTerm);

            if (matchesSearch) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.display = 'none';
            }
        });

        setTimeout(() => {
            const visibleCards = Array.from(artistCards).filter(card =>
                card.style.display !== 'none'
            );

            let searchCounter = document.querySelector('.search-counter');
            if (!searchCounter) {
                searchCounter = document.createElement('div');
                searchCounter.className = 'search-counter';
                searchCounter.style.cssText = `
                    text-align: center;
                    margin: 1rem 0;
                    font-size: 1rem;
                    color: #666;
                `;

                const searchContainer = document.querySelector('.search-container');
                if (searchContainer) {
                    searchContainer.appendChild(searchCounter);
                }
            }

            if (searchTerm) {
                searchCounter.innerHTML = `
                    Encontrados <strong>${visibleCards.length} artistas</strong> para "${searchTerm}"
                `;
                searchCounter.style.display = 'block';
            } else {
                searchCounter.style.display = 'none';
            }
        }, 100);
    }

    artistCards.forEach(card => {
        card.addEventListener('click', function () {
            const artistName = this.querySelector('h3') ? this.querySelector('h3').textContent : 'Artista';
            const artistGenre = this.querySelector('.artist-genre') ? this.querySelector('.artist-genre').textContent : '';
            const artistStage = this.querySelector('.artist-stage') ? this.querySelector('.artist-stage').textContent : '';

            showArtistModal(artistName, artistGenre, artistStage);
        });

        card.style.cursor = 'pointer';
    });

    function showArtistModal(name, genre, stage) {
        const modal = document.createElement('div');
        modal.className = 'artist-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;

        modalContent.innerHTML = `
            <h2 style="color: #ff6b35; margin-bottom: 1rem;">${name}</h2>
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem;"><strong>Gênero:</strong> ${genre}</p>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;"><strong>Apresentação:</strong> ${stage}</p>
            <p style="color: #666; margin-bottom: 2rem;">
                Clique fora desta janela para fechar ou pressione ESC.
            </p>
            <button class="close-modal" style="
                background: #ff6b35;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: bold;
            ">Fechar</button>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        modalContent.querySelector('.close-modal').addEventListener('click', closeModal);

        document.addEventListener('keydown', handleEscKey);

        function closeModal() {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
            setTimeout(() => {
                modal.remove();
                document.removeEventListener('keydown', handleEscKey);
            }, 300);
        }

        function handleEscKey(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        }
    }

    createSearchBox();

    updateArtistCounter('all');

    artistCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    let clickCount = 0;
    const logo = document.querySelector('.nav-brand h1');

    if (logo) {
        logo.addEventListener('click', function () {
            clickCount++;

            if (clickCount === 5) {
                activatePartyMode();
                clickCount = 0;
            }
        });
    }

    function activatePartyMode() {
        console.log('🎉 MODO FESTA ATIVADO!');

        document.body.style.animation = 'party-colors 2s infinite';

        createConfetti();

        if (window.showNotification) {
            window.showNotification('🎉 MODO FESTA ATIVADO! O lineup está ainda mais incrível!', 'success');
        }

        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }

    function createConfetti() {
        const colors = ['#ff6b35', '#f7931e', '#6a4c93', '#1e3c72'];

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                z-index: 10000;
                animation: confetti-fall 3s linear forwards;
            `;

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }

    console.log('✨ Dica: Clique 5 vezes no logo para ativar o modo festa!');
});

const lineupStyle = document.createElement('style');
lineupStyle.textContent = `
    @keyframes party-colors {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .artist-search:focus {
        border-color: #ff6b35 !important;
        box-shadow: 0 0 10px rgba(255, 107, 53, 0.3) !important;
    }
`;

document.head.appendChild(lineupStyle);
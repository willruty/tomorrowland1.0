
document.addEventListener('DOMContentLoaded', function () {
    console.log('📧 Contact page - JavaScript carregado!');

    const form = document.getElementById('contactForm');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const assuntoSelect = document.getElementById('assunto');
    const mensagemTextarea = document.getElementById('mensagem');
    const charCounter = document.getElementById('charCounter');
    const feedbackMessage = document.getElementById('feedbackMessage');

    const nomeError = document.getElementById('nomeError');
    const emailError = document.getElementById('emailError');
    const assuntoError = document.getElementById('assuntoError');
    const mensagemError = document.getElementById('mensagemError');

    mensagemTextarea.addEventListener('input', function () {
        const currentLength = this.value.length;
        const minLength = 20;

        charCounter.textContent = `${currentLength}/${minLength} caracteres`;

        if (currentLength < minLength) {
            charCounter.style.color = '#e74c3c';
        } else {
            charCounter.style.color = '#27ae60';
        }

        if (currentLength > 0 && currentLength < minLength) {
            mensagemError.textContent = `A mensagem deve ter pelo menos ${minLength} caracteres.`;
            mensagemTextarea.style.borderColor = '#e74c3c';
        } else {
            mensagemError.textContent = '';
            mensagemTextarea.style.borderColor = '#ddd';
        }
    });

    nomeInput.addEventListener('blur', validateNome);
    nomeInput.addEventListener('input', function () {
        if (this.value.length > 0) {
            validateNome();
        } else {
            nomeError.textContent = '';
            this.style.borderColor = '#ddd';
        }
    });

    // Validação do e-mail
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', function () {
        if (this.value.length > 0) {
            validateEmail();
        } else {
            emailError.textContent = '';
            this.style.borderColor = '#ddd';
        }
    });

    // Validação do assunto
    assuntoSelect.addEventListener('change', validateAssunto);


    function validateNome() {
        const nome = nomeInput.value.trim();

        if (nome === '') {
            nomeError.textContent = 'O nome é obrigatório.';
            nomeInput.style.borderColor = '#e74c3c';
            return false;
        } else if (nome.length < 2) {
            nomeError.textContent = 'O nome deve ter pelo menos 2 caracteres.';
            nomeInput.style.borderColor = '#e74c3c';
            return false;
        } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome)) {
            nomeError.textContent = 'O nome deve conter apenas letras e espaços.';
            nomeInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            nomeError.textContent = '';
            nomeInput.style.borderColor = '#27ae60';
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '') {
            emailError.textContent = 'O e-mail é obrigatório.';
            emailInput.style.borderColor = '#e74c3c';
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Por favor, insira um e-mail válido.';
            emailInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = '#27ae60';
            return true;
        }
    }

    function validateAssunto() {
        const assunto = assuntoSelect.value;

        if (assunto === '') {
            assuntoError.textContent = 'Por favor, selecione um assunto.';
            assuntoSelect.style.borderColor = '#e74c3c';
            return false;
        } else {
            assuntoError.textContent = '';
            assuntoSelect.style.borderColor = '#27ae60';
            return true;
        }
    }

    function validateMensagem() {
        const mensagem = mensagemTextarea.value.trim();
        const minLength = 20;

        if (mensagem === '') {
            mensagemError.textContent = 'A mensagem é obrigatória.';
            mensagemTextarea.style.borderColor = '#e74c3c';
            return false;
        } else if (mensagem.length < minLength) {
            mensagemError.textContent = `A mensagem deve ter pelo menos ${minLength} caracteres.`;
            mensagemTextarea.style.borderColor = '#e74c3c';
            return false;
        } else {
            mensagemError.textContent = '';
            mensagemTextarea.style.borderColor = '#27ae60';
            return true;
        }
    }

    function validateForm() {
        const isNomeValid = validateNome();
        const isEmailValid = validateEmail();
        const isAssuntoValid = validateAssunto();
        const isMensagemValid = validateMensagem();

        return isNomeValid && isEmailValid && isAssuntoValid && isMensagemValid;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            showFeedback('Por favor, corrija os erros antes de enviar.', 'error');

            const firstError = form.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        submitButton.style.opacity = '0.7';

        const formData = {
            nome: nomeInput.value.trim(),
            email: emailInput.value.trim(),
            assunto: assuntoSelect.value,
            mensagem: mensagemTextarea.value.trim(),
            timestamp: new Date().toISOString()
        };

        setTimeout(() => {
            console.log('📧 Dados do formulário:', formData);

            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.style.opacity = '1';

            showFeedback('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');

            form.reset();
            resetFormStyles();

            charCounter.textContent = '0/20 caracteres';
            charCounter.style.color = '#666';

            if (window.showNotification) {
                window.showNotification('✅ Sua mensagem foi enviada com sucesso!', 'success');
            }

        }, 2000); 
    });


    function showFeedback(message, type) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = `feedback-message ${type}`;
        feedbackMessage.style.display = 'block';

        feedbackMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        if (type === 'success') {
            setTimeout(() => {
                feedbackMessage.style.display = 'none';
            }, 8000);
        }
    }

    function resetFormStyles() {
        const inputs = [nomeInput, emailInput, assuntoSelect, mensagemTextarea];
        const errors = [nomeError, emailError, assuntoError, mensagemError];

        inputs.forEach(input => {
            input.style.borderColor = '#ddd';
        });

        errors.forEach(error => {
            error.textContent = '';
        });
    }

    mensagemTextarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });

    nomeInput.addEventListener('blur', function () {
        this.value = this.value.trim().replace(/\b\w/g, function (l) {
            return l.toUpperCase();
        });
    });

    emailInput.addEventListener('blur', function () {
        this.value = this.value.trim().toLowerCase();
    });

    function saveDraft() {
        const draftData = {
            nome: nomeInput.value,
            email: emailInput.value,
            assunto: assuntoSelect.value,
            mensagem: mensagemTextarea.value
        };

        localStorage.setItem('tomorrowland_contact_draft', JSON.stringify(draftData));
    }

    function loadDraft() {
        const savedDraft = localStorage.getItem('tomorrowland_contact_draft');

        if (savedDraft) {
            try {
                const draftData = JSON.parse(savedDraft);

                if (draftData.nome) nomeInput.value = draftData.nome;
                if (draftData.email) emailInput.value = draftData.email;
                if (draftData.assunto) assuntoSelect.value = draftData.assunto;
                if (draftData.mensagem) {
                    mensagemTextarea.value = draftData.mensagem;
                    mensagemTextarea.dispatchEvent(new Event('input'));
                }

                console.log('📝 Rascunho carregado do localStorage');
            } catch (e) {
                console.log('Erro ao carregar rascunho:', e);
            }
        }
    }

    [nomeInput, emailInput, assuntoSelect, mensagemTextarea].forEach(input => {
        input.addEventListener('input', saveDraft);
    });

    form.addEventListener('submit', function () {
        localStorage.removeItem('tomorrowland_contact_draft');
    });

    let formStats = {
        focusTime: {},
        startTime: Date.now(),
        interactions: 0
    };

    [nomeInput, emailInput, assuntoSelect, mensagemTextarea].forEach(input => {
        input.addEventListener('focus', function () {
            formStats.focusTime[this.id] = Date.now();
            formStats.interactions++;
        });

        input.addEventListener('blur', function () {
            if (formStats.focusTime[this.id]) {
                const timeSpent = Date.now() - formStats.focusTime[this.id];
                console.log(`Tempo gasto no campo ${this.id}: ${timeSpent}ms`);
            }
        });
    });

    loadDraft();

    setTimeout(() => {
        nomeInput.focus();
    }, 500);

    console.log('✅ Sistema de validação de formulário inicializado');
    console.log('💾 Sistema de rascunho automático ativo');
});

function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

function isSpam(message) {
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'click here', 'free money'];
    const lowerMessage = message.toLowerCase();

    return spamKeywords.some(keyword => lowerMessage.includes(keyword));
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

console.log('🔒 Validações de segurança carregadas');
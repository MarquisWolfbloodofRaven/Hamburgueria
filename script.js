// Preços
const PRECO_BASE = 20.00;
const PRECO_BACON = 2.00;
const PRECO_QUEIJO = 2.00;
const PRECO_ONION = 3.00;

// Elementos DOM
let quantidade = 1;
const nomeInput = document.getElementById('nome');
const baconCheckbox = document.getElementById('bacon');
const queijoCheckbox = document.getElementById('queijo');
const onionCheckbox = document.getElementById('onion');
const quantityDisplay = document.getElementById('quantity');
const decrementButton = document.getElementById('decrement');
const incrementButton = document.getElementById('increment');
const resumoDisplay = document.getElementById('resumo');
const totalDisplay = document.getElementById('total');
const enviarPedidoButton = document.getElementById('enviarPedido');
const enviarEmailButton = document.getElementById('enviarEmail');
const confirmationModal = document.getElementById('confirmationModal');
const closeModalButton = document.getElementById('closeModal');
const modalMessage = document.getElementById('modalMessage');

// Funções para manipular quantidade
function incrementarQuantidade() {
    quantidade++;
    atualizarQuantidade();
}

function decrementarQuantidade() {
    if (quantidade > 1) {
        quantidade--;
        atualizarQuantidade();
    }
}

function atualizarQuantidade() {
    quantityDisplay.textContent = quantidade;
    decrementButton.disabled = quantidade <= 1;
    calcularTotal();
    atualizarResumo();
}

// Função para calcular o total
function calcularTotal() {
    let total = PRECO_BASE * quantidade;
    
    if (baconCheckbox.checked) {
        total += PRECO_BACON * quantidade;
    }
    
    if (queijoCheckbox.checked) {
        total += PRECO_QUEIJO * quantidade;
    }
    
    if (onionCheckbox.checked) {
        total += PRECO_ONION * quantidade;
    }
    
    totalDisplay.textContent = `R$ ${total.toFixed(2)}`;
    return total;
}

// Função para atualizar o resumo
function atualizarResumo() {
    const nome = nomeInput.value.trim() || "[Nome não informado]";
    const temBacon = baconCheckbox.checked ? "Sim" : "Não";
    const temQueijo = queijoCheckbox.checked ? "Sim" : "Não";
    const temOnion = onionCheckbox.checked ? "Sim" : "Não";
    const total = calcularTotal();
    
    const resumo = `
        <strong>Nome do cliente:</strong> ${nome}<br>
        <strong>Tem Bacon?</strong> ${temBacon}<br>
        <strong>Tem Queijo?</strong> ${temQueijo}<br>
        <strong>Tem Onion Rings?</strong> ${temOnion}<br>
        <strong>Quantidade:</strong> ${quantidade}<br>
        <strong>Preço final:</strong> R$ ${total.toFixed(2)}
    `;
    
    resumoDisplay.innerHTML = resumo;
}

// Função para enviar pedido
function enviarPedido() {
    if (!nomeInput.value.trim()) {
        alert("Por favor, digite seu nome antes de enviar o pedido.");
        nomeInput.focus();
        return;
    }
    
    const nome = nomeInput.value.trim();
    const total = calcularTotal();
    
    modalMessage.innerHTML = `
        <p>Pedido enviado com sucesso, ${nome}!</p>
        <p>Valor total: <strong>R$ ${total.toFixed(2)}</strong></p>
        <p>Seu pedido será preparado e estará pronto em aproximadamente 30 minutos.</p>
    `;
    
    confirmationModal.style.display = 'flex';
}

// Função para enviar por e-mail (simulação do Intent do Android)
function enviarPorEmail() {
    if (!nomeInput.value.trim()) {
        alert("Por favor, digite seu nome antes de enviar o pedido por e-mail.");
        nomeInput.focus();
        return;
    }
    
    const nome = nomeInput.value.trim();
    const temBacon = baconCheckbox.checked ? "Sim" : "Não";
    const temQueijo = queijoCheckbox.checked ? "Sim" : "Não";
    const temOnion = onionCheckbox.checked ? "Sim" : "Não";
    const total = calcularTotal();
    
    // Criar conteúdo do e-mail
    const assunto = `Pedido de ${nome}`;
    const corpo = `
Nome do cliente: ${nome}
Tem Bacon? ${temBacon}
Tem Queijo? ${temQueijo}
Tem Onion Rings? ${temOnion}
Quantidade: ${quantidade}
Preço final: R$ ${total.toFixed(2)}
    `.trim();
    
    // Simular abertura do cliente de e-mail padrão (como o Intent do Android faria)
    const mailtoLink = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    
    // Abrir cliente de e-mail (se configurado no navegador)
    window.location.href = mailtoLink;
    
    // Mostrar mensagem de confirmação
    modalMessage.innerHTML = `
        <p>Cliente de e-mail aberto!</p>
        <p>Se o cliente de e-mail não abrir automaticamente, copie e cole as informações abaixo:</p>
        <div style="text-align: left; background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 5px;">
            <strong>Assunto:</strong> ${assunto}<br><br>
            <strong>Corpo do e-mail:</strong><br>
            ${corpo.replace(/\n/g, '<br>')}
        </div>
    `;
    
    confirmationModal.style.display = 'flex';
}

// Event Listeners
decrementButton.addEventListener('click', decrementarQuantidade);
incrementButton.addEventListener('click', incrementarQuantidade);

baconCheckbox.addEventListener('change', () => {
    calcularTotal();
    atualizarResumo();
});

queijoCheckbox.addEventListener('change', () => {
    calcularTotal();
    atualizarResumo();
});

onionCheckbox.addEventListener('change', () => {
    calcularTotal();
    atualizarResumo();
});

nomeInput.addEventListener('input', atualizarResumo);

enviarPedidoButton.addEventListener('click', enviarPedido);
enviarEmailButton.addEventListener('click', enviarPorEmail);

closeModalButton.addEventListener('click', () => {
    confirmationModal.style.display = 'none';
});

// Fechar modal ao clicar fora dele
confirmationModal.addEventListener('click', (e) => {
    if (e.target === confirmationModal) {
        confirmationModal.style.display = 'none';
    }
});

// Inicialização
atualizarQuantidade();

// Se a imagem do logo não existir, criamos uma placeholder
window.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('logo');
    logo.onerror = function() {
        // Criar uma logo placeholder se o arquivo não existir
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        
        // Fundo laranja
        ctx.fillStyle = '#FF6B35';
        ctx.fillRect(0, 0, 100, 100);
        
        // Hambúrguer
        ctx.fillStyle = '#8B4513'; // Pão
        ctx.fillRect(20, 20, 60, 60);
        
        ctx.fillStyle = '#D2691E'; // Carne
        ctx.fillRect(25, 35, 50, 10);
        
        ctx.fillStyle = '#FFD700'; // Queijo
        ctx.fillRect(25, 45, 50, 5);
        
        ctx.fillStyle = '#228B22'; // Alface
        ctx.fillRect(25, 50, 50, 5);
        
        // Texto
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('HamburgueriaZ', 50, 85);
        
        logo.src = canvas.toDataURL();
    };
});

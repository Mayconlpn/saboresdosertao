document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.nav-link');
    const productGrids = document.querySelectorAll('.product-grid');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // Função para atualizar o contador de itens no ícone do carrinho
    function updateCartCounter() {
        // Pega os itens do 'localStorage' ou, se não houver nada, cria uma lista vazia.
        const cartItems = JSON.parse(localStorage.getItem('saboresDoSertaoCart')) || [];
        if (cartCountElement) {
            cartCountElement.textContent = cartItems.length;
        }
    }

    // Função para adicionar um item ao carrinho
    function addToCart(event) {
        const button = event.target;
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPriceText = productCard.querySelector('.price').textContent;
        
        // Extrai apenas o valor numérico do preço
        const price = parseFloat(productPriceText.replace('R$', '').replace(',', '.'));

        // Valida se o preço foi extraído corretamente
        if (isNaN(price)) {
            console.error("Não foi possível ler o preço do produto:", productName);
            return; // Para a execução se não encontrar o preço
        }

        // Pega o carrinho atual do localStorage
        const cartItems = JSON.parse(localStorage.getItem('saboresDoSertaoCart')) || [];

        // Adiciona o novo item
        cartItems.push({ name: productName, price: price });

        // Salva a lista ATUALIZADA de volta no localStorage
        localStorage.setItem('saboresDoSertaoCart', JSON.stringify(cartItems));

        // Atualiza o número no ícone do carrinho
        updateCartCounter();

        // Efeito visual no botão para dar feedback ao usuário
        button.textContent = 'Adicionado!';
        button.style.backgroundColor = '#8D6E63'; // Cor de feedback
        setTimeout(() => {
            button.textContent = 'Adicionar ao Carrinho';
            button.style.backgroundColor = 'var(--primary-color)'; // Volta à cor original
        }, 1500);
    }

    // --- LÓGICA DE NAVEGAÇÃO E EVENTOS ---

    // Adiciona o evento de clique para TODOS os botões "Adicionar ao Carrinho"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Lógica para as abas de produtos (Frutas, Legumes, etc.)
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const targetId = link.getAttribute('href');
            productGrids.forEach(grid => {
                grid.classList.add('hidden');
            });
            document.querySelector(targetId).classList.remove('hidden');
        });
    });

    // Lógica para o menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    }
    
    // ATUALIZA O CONTADOR DO CARRINHO ASSIM QUE A PÁGINA PRINCIPAL CARREGA
    updateCartCounter();
});
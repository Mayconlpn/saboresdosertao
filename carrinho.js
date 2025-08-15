document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalPriceElement = document.getElementById('subtotal-price');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');

    // Função para carregar itens do localStorage e exibir na página
    function renderCart() {
        // Pega os itens do localStorage. Usa a mesma "chave" ('saboresDoSertaoCart') do outro script.
        const cartItems = JSON.parse(localStorage.getItem('saboresDoSertaoCart')) || [];

        // Atualiza o contador no cabeçalho
        if (cartCountElement) {
            cartCountElement.textContent = cartItems.length;
        }

        // Limpa a lista de itens para não duplicar ao renderizar
        cartItemsContainer.innerHTML = '';

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center;">Seu carrinho está vazio. <a href="index.html" style="color: var(--primary-color);">Voltar para a loja</a>.</p>';
            subtotalPriceElement.textContent = 'R$ 0,00';
            totalPriceElement.textContent = 'R$ 0,00';
            return;
        }

        let total = 0;
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item-card');
            // 'data-index' é um atributo que nos ajuda a saber qual item remover
            itemElement.innerHTML = `
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>Preço: R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <button class="remove-item-btn" data-index="${index}">Remover</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });

        // Adiciona evento de clique para os botões "Remover"
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', removeItemFromCart);
        });

        // Atualiza os preços do resumo
        subtotalPriceElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        totalPriceElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
    
    // Função para remover um item do carrinho
    function removeItemFromCart(event) {
        const indexToRemove = parseInt(event.target.getAttribute('data-index'));
        let cartItems = JSON.parse(localStorage.getItem('saboresDoSertaoCart')) || [];
        
        // Remove o item da lista (array) pelo seu índice
        cartItems.splice(indexToRemove, 1);
        
        // Salva a lista atualizada de volta no localStorage
        localStorage.setItem('saboresDoSertaoCart', JSON.stringify(cartItems));
        
        // Re-renderiza o carrinho para mostrar a remoção
        renderCart();
    }

    // Renderiza o carrinho assim que a página é aberta
    renderCart();
});
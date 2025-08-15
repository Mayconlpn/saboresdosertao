import { useState, useEffect } from 'react';

export function useCarrinho() {
  const [carrinho, setCarrinho] = useState([]);

  // Carregar carrinho do localStorage ao inicializar
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('sabores-carrinho');
    if (carrinhoSalvo) {
      try {
        setCarrinho(JSON.parse(carrinhoSalvo));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('sabores-carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho(carrinhoAtual => {
      const itemExistente = carrinhoAtual.find(item => item.id === produto.id);

      if (itemExistente) {
        return carrinhoAtual.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...carrinhoAtual, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinho(carrinhoAtual => {
      const itemExistente = carrinhoAtual.find(item => item.id === produtoId);

      if (itemExistente && itemExistente.quantidade > 1) {
        return carrinhoAtual.map(item =>
          item.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        );
      } else {
        return carrinhoAtual.filter(item => item.id !== produtoId);
      }
    });
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const obterTotalItens = () => {
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
  };

  const obterTotalPreco = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  return {
    carrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    limparCarrinho,
    obterTotalItens,
    obterTotalPreco
  };
}

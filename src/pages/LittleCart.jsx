import React, { Component } from 'react';

export default class LittleCart extends Component {
  state = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  };

  render() {
    const { cart } = this.state;
    const emptyCart = <p>Seu carrinho está vazio.</p>;
    const itemCartRender = cart.map(({ price, title, thumbnail, idList, addCount }) => (
      <div key={ idList }>
        <img src={ thumbnail } alt={ title } />
        <p data-testid="shopping-cart-product-name">{ title }</p>
        <p>{price}</p>
        <p data-testid="shopping-cart-product-quantity">
          Quantidade :
          {' '}
          {addCount ? `${addCount}` : `${1}`}
        </p>
      </div>
    ));
    return (
      <div data-testid="shopping-cart-empty-message">
        {cart.length === 0 ? emptyCart : itemCartRender }
      </div>
    );
  }
}

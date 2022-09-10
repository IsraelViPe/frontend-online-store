import React, { Component } from 'react';

export default class LittleCart extends Component {
  state = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  };

  render() {
    const { cart } = this.state;
    const emptyCart = <p>Seu carrinho está vazio.</p>
    const itemCart = cart.map(({price, title, thumbnail, idList }) => {
      <div key={idList}>
        <img src={thumbnail} alt={ title } />
        <p data-testid="shopping-cart-product-name">{ title }</p>
        <p>{price}</p>
        <p data-testid="shopping-cart-product-quantity">
          Quantidade :
           </p>
      </div>
    })
    return (
      <div data-testid="shopping-cart-empty-message">
        {/* {cart.length === 0 ? emptyCart : } */}
      </div>
    );
  }
}

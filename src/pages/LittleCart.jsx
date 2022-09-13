import React, { Component } from 'react';

export default class LittleCart extends Component {
  state = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  };

  getProductIndexInCart = (cart, product) => {
    let indexProduct = 0;
    cart.forEach((productCurr, index) => {
      if (productCurr.idList === product.idList) {
        indexProduct = index;
      }
    });
    return indexProduct;
  };

  incrementa = ({ target }) => {
    const { cart } = this.state;
    const productID = target.parentElement.parentElement.id;
    const product = cart.find((productCurr) => (productCurr.idList === productID));
    const indexProduct = this.getProductIndexInCart(cart, product);
    if (!product.addCount) {
      product.addCount = 2;
    } else {
      product.addCount += 1;
    }
    cart.splice(indexProduct, 1, product);
    this.setState({
      cart,
    });
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  decrementa = ({ target }) => {
    const { cart } = this.state;
    const productID = target.parentElement.parentElement.id;
    const product = cart.find((productCurr) => (productCurr.idList === productID));
    const indexProduct = this.getProductIndexInCart(cart, product);

    if (!product.addCount || product.addCount === 1) {
      product.addCount = 1;
    }

    if (product.addCount > 1) {
      product.addCount -= 1;
    }

    cart.splice(indexProduct, 1, product);
    this.setState({
      cart,
    });
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  remove = ({ target }) => {
    const { cart } = this.state;
    const productID = target.parentElement.parentElement.id;
    const filterdCart = cart.filter((productCurr) => (productCurr.idList !== productID));

    this.setState({
      cart: cart.filter((productCurr) => (productCurr.idList !== productID)),
    });

    if (cart.length === 1) {
      localStorage.clear();
    } else {
      localStorage.clear();
      localStorage.setItem('cart', JSON.stringify(filterdCart));
    }
  };

  render() {
    const style = {
      display: 'inline-block',
    };

    const { cart } = this.state;
    const emptyCart = <p>Seu carrinho está vazio.</p>;
    const itemCartRender = cart.map(({ price, title, thumbnail, idList, addCount }) => (
      <div key={ idList } id={ idList }>
        <div style={ { display: 'inline-block' } }>
          <img src={ thumbnail } alt={ title } />
          <p data-testid="shopping-cart-product-name">{ title }</p>
          <p>{price}</p>
          <p data-testid="shopping-cart-product-quantity">
            Quantidade :
            {' '}
            {addCount ? `${addCount}` : `${1}`}
          </p>
        </div>
        <div style={ style }>
          <button
            type="button"
            data-testid="product-increase-quantity"
            onClick={ this.incrementa }
          >
            Adicionar1
          </button>
          <button
            type="button"
            name="buttonRemove"
            data-testid="remove-product"
            onClick={ this.remove }
          >
            remover producto
          </button>
          <button
            type="button"
            data-testid="product-decrease-quantity"
            onClick={ this.decrementa }
          >
            Retirar 1
          </button>
        </div>
      </div>
    ));
    return (
      <div data-testid="shopping-cart-empty-message">
        {cart.length === 0 ? emptyCart : itemCartRender }
      </div>
    );
  }
}

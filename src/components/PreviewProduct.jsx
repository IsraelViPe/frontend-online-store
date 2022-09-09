import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PreviewProduct extends Component {
  render() {
    const { thumbnail, price, title, handleAddCart, idButton } = this.props;
    return (
      <div data-testid="product">
        <div>
          <img
            src={ thumbnail }
            alt={ title }
          />
        </div>
        <h2>{ title }</h2>
        <span>{ price }</span>
        <button
          id={ idButton }
          data-testid="product-add-to-cart"
          type="button"
          onClick={ handleAddCart }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

PreviewProduct.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  handleAddCart: PropTypes.func.isRequired,
  idButton: PropTypes.string.isRequired,
};

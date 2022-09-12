import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class PreviewProduct extends Component {
  render() {
    const { thumbnail, price, title, handleAddCart, idButton, idProduct } = this.props;
    return (
      <Link
        data-testid="product"
        to={ `details/${idProduct}` }
      >
        <div
          data-testid="product-detail-link"
        >
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
      </Link>
    );
  }
}

PreviewProduct.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  handleAddCart: PropTypes.func.isRequired,
  idButton: PropTypes.string.isRequired,
  idProduct: PropTypes.string.isRequired,
};

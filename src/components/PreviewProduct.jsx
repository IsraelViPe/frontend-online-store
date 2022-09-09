import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class PreviewProduct extends Component {
  render() {
    const { thumbnail, price, title, idProduct } = this.props;
    return (
      <Link data-testid="product" to={ `details/${idProduct}` }>
        <div>
          <img
            src={ thumbnail }
            alt={ title }
          />
        </div>
        <h2>{ title }</h2>
        <span>{ price }</span>
      </Link>
    );
  }
}

PreviewProduct.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  idProduct: PropTypes.string.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
// import ProductDetails from '../components/ProductDetails';

export default class ProductPage extends React.Component {
  state = {
    renderDetailProduct: {},
  };

  async componentDidMount() {
    this.setState({
      renderDetailProduct: await this.puxaProduto(),
    });
  }

  puxaProduto = async () => {
    const { match: { params: { id } } } = this.props;
    const detailsProduct = await getProductById(id);
    console.log(detailsProduct);
    return detailsProduct;
  };

  render() {
    const { renderDetailProduct } = this.state;
    const { title, price, thumbnail } = renderDetailProduct;

    return (
      <div>
        <div>
          <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        </div>
        <div>
          <ul>
            <li data-testid="product-detail-name">
              Nome:
              {' '}
              { title }
              {' '}
            </li>
            <li data-testid="product-detail-price">
              Preço:
              {' '}
              { price }
            </li>
          </ul>
        </div>
        <Link
          data-testid="shopping-cart-button"
          to="/cart"
        >
          Carrinho
        </Link>
      </div>
    );
  }
}

ProductPage.propTypes = {
  id: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
};

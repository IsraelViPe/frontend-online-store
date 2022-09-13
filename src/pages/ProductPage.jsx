import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class ProductPage extends React.Component {
  state = {
    renderDetailProduct: {},
    updateCart: JSON.parse(localStorage.getItem('cart')) || [],
    counterItens: 0,
  };

  async componentDidMount() {
    this.setState({
      renderDetailProduct: await this.puxaProduto(),
    });
  }

  puxaProduto = async () => {
    const { match: { params: { id } } } = this.props;
    const detailsProduct = await getProductById(id);
    return detailsProduct;
  };

  handleAddCartFromDetailPage = ({ target: { id } }) => {
    const { updateCart, renderDetailProduct } = this.state;
    const { title, price, thumbnail, id: idProduct } = renderDetailProduct;
    const nonRepeatedItens = updateCart.filter((element) => element.idList !== id);
    const repeatedItens = updateCart.filter((element) => element.idList === id);
    if (repeatedItens.length > 0) {
      this.setState((prevState) => ({
        counterItens: prevState.counterItens + 1,
        updateCart: [...nonRepeatedItens],
      }), () => {
        const productAmount = updateCart.find(({ idList }) => idList === id).addCount;
        this.setState((prevState) => ({
          updateCart: [...prevState.updateCart, {
            thumbnail,
            price,
            title,
            idList: idProduct,
            addCount: productAmount ? prevState.counterItens + productAmount : 2,
          }],
        }), this.saveProductsCart);
      });
    } else {
      this.setState((prevState) => ({
        updateCart: [...prevState.updateCart, {
          thumbnail,
          price,
          title,
          idList: idProduct,
        }],
        counterItens: 0,
      }), this.saveProductsCart);
    }
  };

  saveProductsCart = () => {
    const { updateCart } = this.state;
    localStorage.setItem('cart', JSON.stringify(updateCart));
  };

  render() {
    const { renderDetailProduct } = this.state;
    const { title, price, thumbnail, id } = renderDetailProduct;

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
        <button
          id={ id }
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.handleAddCartFromDetailPage }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductPage.propTypes = {
  id: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
};

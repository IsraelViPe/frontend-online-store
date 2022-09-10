import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import PreviewProduct from '../components/PreviewProduct';

export default class Home extends Component {
  state = {
    term: '',
    listProducts: [],
    listCategories: [],
    productsCart: JSON.parse(localStorage.getItem('cart')) || [],
    counterItens: 1,
  };

  componentDidMount() {
    this.puxaCategoria();
  }

  puxaCategoria = async () => {
    const responseCategories = await getCategories();
    this.setState({
      listCategories: responseCategories,
    });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      term: value,
    });
  };

  handleClick = async ({ target: { id } }) => {
    const { term } = this.state;
    const requestTerm = await getProductsFromCategoryAndQuery(id, term);
    this.setState({
      listProducts: requestTerm.results,
    });
  };

  handleAddCart = ({ target: { id } }) => {
    const { listProducts, productsCart } = this.state;
    const clickedProduct = listProducts.find(({ id: idList }) => idList === id);
    const { thumbnail, price, title, id: idList } = clickedProduct;
    this.setState((prevState) => ({
      productsCart: [...prevState.productsCart, {
        thumbnail,
        price,
        title,
        idList,
      }],
    }), this.saveProductsCart);
    const noRepeatItens = productsCart.filter((element) => element.idList !== id);
    const repeatItens = productsCart.filter((element) => element.idList === id);
    if (repeatItens.length > 0) {
      this.setState((prevState) => ({
        counterItens: prevState.counterItens + 1,

      }), () => {
        this.setState((prevState) => ({
          productsCart: [...noRepeatItens, {
            thumbnail,
            price,
            title,
            idList,
            addCount: prevState.counterItens,
          }],
        }), this.saveProductsCart);
      });
    } else {
      this.setState({
        counterItens: 1,
      });
    }
  };

  saveProductsCart = () => {
    const { productsCart } = this.state;
    localStorage.setItem('cart', JSON.stringify(productsCart));
  };

  render() {
    const { term, listProducts, listCategories } = this.state;
    const notFound = <span>Nenhum produto foi encontrado</span>;

    const productsCards = (
      listProducts.map(({ thumbnail, price, title, id }) => (<PreviewProduct
        key={ id }
        idButton={ id }
        thumbnail={ thumbnail }
        price={ price }
        title={ title }
        handleAddCart={ this.handleAddCart }
      />)));
    return (
      <div>
        <div id="categorias">
          { listCategories.map(({ id, name }) => (
            <button
              key={ id }
              id={ id }
              type="button"
              data-testid="category"
              onClick={ this.handleClick }
            >
              { name }
            </button>
          ))}
        </div>
        <div id="pesquisa">
          <input
            data-testid="query-input"
            type="text"
            name="product"
            value={ term }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </div>
        {listProducts.length === 0 ? notFound : productsCards}
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link data-testid="shopping-cart-button" to="/cart">Carrinho:</Link>
      </div>
    );
  }
}

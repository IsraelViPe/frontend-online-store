import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import PreviewProduct from '../components/PreviewProduct';

export default class Home extends Component {
  state = {
    term: '',
    listProducts: [],
    listCategories: [],
  };

  componentDidMount() {
    this.puxaCategoria();
  }

  puxaCategoria = async () => {
    const responseCategories = await getCategories();
    // console.log(responseCategories);
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
    // console.log(id);
    const requestTerm = await getProductsFromCategoryAndQuery(id, term);
    this.setState({
      listProducts: requestTerm.results,
    });
  };

  render() {
    const { term, listProducts, listCategories } = this.state;
    const notFound = <span>Nenhum produto foi encontrado</span>;

    const productsCards = (
      listProducts.map(({ thumbnail, price, title, id }) => (<PreviewProduct
        key={ id }
        idProduct={ id }
        thumbnail={ thumbnail }
        price={ price }
        title={ title }
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

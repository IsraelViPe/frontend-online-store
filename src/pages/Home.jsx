import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import PreviewProduct from '../components/PreviewProduct';

export default class Home extends Component {
  state = {
    term: '',
    listProducts: [],
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      term: value,
    });
  };

  handleClick = async () => {
    const { term } = this.state;
    const requestTerm = await getProductsFromCategoryAndQuery('', term);
    console.log(requestTerm);
    this.setState({
      listProducts: requestTerm.results,
    });
  };

  render() {
    const { term, listProducts } = this.state;
    const notFound = <span>Nenhum produto foi encontrado</span>;

    const productsCards = (
      listProducts.map(({ thumbnail, price, title, id }) => (<PreviewProduct
        key={ id }
        thumbnail={ thumbnail }
        price={ price }
        title={ title }
      />)));
    return (
      <div>
        <div>
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
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.

        </p>
        { listProducts.length === 0 ? notFound : productsCards }

      </div>
    );
  }
}

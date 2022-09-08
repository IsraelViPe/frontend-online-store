import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div id="pesquisa">
          <input
            type="text"
          />
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
        <Link data-testid="shopping-cart-button" to="/cart">Carrinho:</Link>
      </div>
    );
  }
}

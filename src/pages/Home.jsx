import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <input
            type="text"
          />
        </div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.

        </p>
      </div>
    );
  }
}

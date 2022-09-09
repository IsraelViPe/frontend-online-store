import React from 'react';
import { getProductById } from '../services/api';
// import ProductDetails from '../components/ProductDetails';

export default class ProductPage extends React.Component {
  puxaProduto = async () => {
    const { match: { params: { id } } } = this.props;
    const detailsProduct = await getProductById(id);
    console.log(detailsProduct);
  };

  render() {
    return (
      <div>
        {this.puxaProduto()}
        a
      </div>
    );
  }
}

ProductPage.propTypes = {
  id: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
};

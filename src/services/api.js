export async function getCategories() {
  const data = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const results = await data.json();
  return results;
}

export async function getProductsFromCategoryAndQuery(CATEGORY_ID, QUERY) {
  const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}&q=${QUERY}`);
  const results = await data.json();
  return results;
}

export async function getProductById(PRODUCT_ID) {
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
  const data = await fetch(`https://api.mercadolibre.com/items/${PRODUCT_ID}`);
  const results = await data.json();
  return results;
}

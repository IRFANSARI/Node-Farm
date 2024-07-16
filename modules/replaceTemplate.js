module.exports = (temp, product) => {
  let output = temp.toString();
  output = output.replace(/{%PRODUCT-ID%}/g, product.id);
  output = output.replace(/{%PRODUCT-NAME%}/g, product.productName);
  output = output.replace(/{%PRODUCT-IMG%}/g, product.image);
  output = output.replace(/{%PRODUCT-FROM%}/g, product.from);
  output = output.replace(/{%PRODUCT-NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%PRODUCT-QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRODUCT-PRICE%}/g, product.price);
  output = output.replace(/{%PRODUCT-DESC%}/g, product.description);

  if (!product.organic) output = output.replace(/{%ORGANIC%}/g, 'not-organic');
  return output;
};

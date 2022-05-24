module.exports = (temp, product) => {
    let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%ICON%}/g, product.image);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%LOCATION%}/g, product.from);
    output = output.replace(/{%NUTRIENT%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
  
    if (!product.organic) {
      output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    }
    return output;
  };
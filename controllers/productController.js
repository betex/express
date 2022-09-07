const fs = require("fs");

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.editProductById = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const productsStr = fs.readFileSync(`${__dirname}/../data/products.json`, 'utf8');
  const products = JSON.parse(productsStr);
  const product = products.find((item) => item.id == id);
  if (!product)
    return res.status(404).json({
      status: 'No encontrado',
    });
  product.name = body.name || product.name;
  product.price = body.price || product.price;    
  product.category = body.category || product.category;
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
  res.status(200).json({
    status: 'success',
    data: {
      product,
    }
  })
};

exports.deleteProductById = (req, res) => {
  const id = req.params.id;
  const productsStr = fs.readFileSync(`${__dirname}/../data/products.json`, 'utf8');
  let products = JSON.parse(productsStr);
  const product = products.find((item) => item.id == id);
  if (!product)
    return res.status(404).json({
      status: 'No encontrado',
    });
  products = products.filter((item) => item.id != id);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
  res.status(200).json({
    status: 'success',
    data: {
      product,
    }
  })
};

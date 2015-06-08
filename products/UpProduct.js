var Product = require('../models/product');


UpProduct = function (product) {
    Product.findOne({'sapId': product[0]},
        function (err, sapId) {
            // In case of any error, return using the done method
            if (err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
            }

            // already exists
            if (sapId) {
                return('Product exists')
                //console.log('product is defined', sapId)
            }
            else {
                // if there is no product is not defined
                // create the product
                var newProduct = new Product();

                // set the user's local credentials
                newProduct.sapId = product[0];
                newProduct.name = product[1];
                newProduct.grupArt = product[2];
                newProduct.grupArticulos = product[3];
                newProduct.box = product[4];

                // save the user
                newProduct.save(function (err) {
                    if (err) {
                        console.log('Error in Saving Product: ', product[0], err);
                        throw err;
                    }
                    else {
                        //console.log('Product Defined', product[0])
                    }
                });
            }
        });
};

module.exports = UpProduct;

var Stock = require('../models/stock');



UpdateStock = function (Id, newnumber){

    Stock.findOneAndUpdate({ 'id': Id }, { 'number' :  newnumber},
        function (err, user){
            if (err) {
                console.log('Error in Update: ' + err);
                return done(err);
            }
        });
};


UpStock = function (product) {

    //product Stock Id is the sum of SAP_id and LOT_product
    Stock.findOne({'id': product[0]+'#'+product[9]},
        function (err, stockId) {

            // In case of any error, return using the done method
            if (err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
            }


            // Update Stock
            if (stockId) {
                var NewNumber = stockId.number + parseInt(product[4]);
                debugger;
                console.log(stockId.id, NewNumber)
                //UpdateStock(stockId.id, NewNumber);


            }

            // Define stock
            else {
                var newStock = new Stock();
                // set the user's local credentials
                newStock.id = product[0]+'#'+product[9];
                newStock.sap = product[0];
                newStock.lot = product[9];
                newStock.date = product[10];
                newStock.name = product[1];
                newStock.number = product[4];
                newStock.code = "NON";

                // save the user
                newStock.save(function (err) {
                    if (err) {
                        console.log('Error in Saving Stock: ', product[0], err);
                        throw err;
                    }
                });
                console.log('Stock Defined ', product[0]);

            }
        });
    return ('Stock Update');
};

module.exports = UpStock;

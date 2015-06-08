var fs = require('fs');
var ReadHtml = require('../products/ReadHtml');
var upProd = require('../products/UpProduct');
var upStoc = require('../products/UpStock');

DefProduct = function (req, res, next) {
    var table = ReadFile(req.files.archivo.path);
    if (table == 'err'){
        req.flash('message', 'incorrect file');
        return (next());
    }
    for (var i=0; i< table.length ; i++){
        //console.log(table[i])
        if (table[i][0] == "Material"){
            console.log("Index")
        }

        else {
            UpProduct(table[i], req, res, next);
            var message = UpStock(table[i], req, res, next);
            //debugger
        }
    }
    req.flash('message',  message);
    return (next());
}

module.exports = DefProduct;
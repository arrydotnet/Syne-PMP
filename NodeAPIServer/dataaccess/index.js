var fs = require("fs");

module.exports.getAllProducts = function (cb) {
    var obj = require("../data/Products.json");
    cb(obj.productsData);
}
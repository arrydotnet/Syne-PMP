var fs = require('fs');
const monk = require('monk');
const db = monk('localhost/dbPMP');
const collection = db.get('employee');

module.exports.getAllEmployee = function () {
    //  var data ={"id":100, "name" : "Amit" ,"designation": "Lead technology1", "disabled": false}; 
    return new Promise((resolve, reject) => {
        collection.find({}).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[getAllEmployee Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.getUserById = function (id) {
    return new Promise((resolve, reject) => {
        collection.findOne({ _id: monk.id(id) }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[getAllEmployee Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.addEmployee = function (empObj) {
    return new Promise((resolve, reject) => {
        collection.insert(empObj).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[addEmployee Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.updateEmployee = function (id,empObj) {
    return new Promise((resolve, reject) => {
        collection.findOneAndUpdate({ _id: monk.id(id) }, { $set: empObj }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[updateEmployee Error]!:', err);
            reject("Connection Error...");
        });
    });
}

module.exports.deleteEmployee = function (id) {
    return new Promise((resolve, reject) => {
        collection.findOneAndDelete({ _id: monk.id(id) }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[deleteEmployee Error]!:', err);
            reject("Connection Error...");
        });
    });
}


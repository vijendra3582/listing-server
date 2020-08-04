const sequelize = require('./../config/database');

module.exports = {
    create: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Wishlist_Insert(' + queryData + ')').then(response => {
            var response = JSON.parse(response[0].message);
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },

    deleteA: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Wishlist_Delete(' + queryData + ')').then(response => {
            var response = JSON.parse(response[0].message);
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },

    single: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Wishlist_Single(' + queryData + ')').then(response => {
            var response = response;
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    }
};
const sequelize = require('./../config/database');

module.exports = {
    create: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Coupon_Insert(' + queryData + ')').then(response => {
            var response = response[0].message;
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },

    update: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Coupon_Update(' + queryData + ')').then(response => {
            var response = response[0].message;
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },

    deleteA: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Coupon_Delete(' + queryData + ')').then(response => {
            var response = response[0].message;
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },

    single: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Coupon_Single(' + queryData + ')').then(response => {
            var response = response[0];
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },

    all: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Coupon_All(' + queryData + ')').then(response => {
            var response = response;
            sequelize.query('CALL Coupon_Count(' + queryData + ')').then(count => {
                return callBack(null, { "response": response, "count": count });
            });
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    }
};
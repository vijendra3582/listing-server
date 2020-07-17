const sequelize = require('./../config/database');

module.exports = {
    create: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Category_Insert(' + queryData + ')').then(response => {
            var response = response[0].message;
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },

    update: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Category_Update(' + queryData + ')').then(response => {
            var response = response[0].message;
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },

    deleteA: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Category_Delete(' + queryData + ')').then(response => {
            var response = response[0].message;
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },

    single: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Category_Single(' + queryData + ')').then(response => {
            var response = response[0];
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },

    all: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Category_All(' + queryData + ')').then(response => {
            var response = response;
            
            sequelize.query('CALL Category_Count(' + queryData + ')').then(count => {
                return callBack(null, { "response": response, "count": count });
            });
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    }
};
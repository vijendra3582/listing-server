const sequelize = require('./../config/database');

module.exports = {
    country: (data, callBack) => {
        sequelize.query('CALL Get_Country()').then(response => {
            var response = response;
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });;
        });
    },

    state: (data, callBack) => {
        sequelize.query('CALL Get_State(' + data + ')').then(response => {
            var response = response;
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });;
        });
    },

    city: (data, callBack) => {
        sequelize.query('CALL Get_City(' + data + ')').then(response => {
            var response = response;
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },
};
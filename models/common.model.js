const sequelize = require('./../config/database');

module.exports = {
    dropdown: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Dropdown_Get(' + queryData + ')').then(response => {
            var response = response;
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    }
};
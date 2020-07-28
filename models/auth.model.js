const sequelize = require("./../config/database");

module.exports = {
    create: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        if (data.role == 'user') {
            sequelize.query('CALL User_Registration(' + queryData + ')').then(response => {
                var response = JSON.parse(response[0].message);
                return callBack(null, response);
            }).catch(error => {
                callBack({ "name": error.name, "message": error.original.sqlMessage });
            });
        } else if (data.role == 'vendor') {
            sequelize.query('CALL Vendor_Registration(' + queryData + ')').then(response => {
                var response = JSON.parse(response[0].message);
                return callBack(null, response);
            }).catch(error => {
                callBack({ "name": error.name, "message": error.original.sqlMessage });
            });
        }
    },

    getByEmail: (data, callBack) => {
        var data = { "field": "email", "value": data.email};
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL User_Single(' + queryData + ')').then(response => {
            return callBack(null, response[0]);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    getByEmailVendor: (data, callBack) => {
        var data = { "field": "email", "value": data.email};
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Vendor_Single(' + queryData + ')').then(response => {
            var response = JSON.parse(response[0].message);
            return callBack(null, response);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    getByEmailAdmin: (data, callBack) => {
        var data = { "field": "email", "value": data.email};
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Admin_Single(' + queryData + ')').then(response => {
            return callBack(null, response[0]);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    getUserByUserId: (id, callBack) => {
        var dataP = { "field": "id", "value": id };
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(dataP).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Get_User_Single(' + queryData + ')').then(response => {
            return callBack(null, response[0]);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    getUsers: callBack => {
        var data = { "field": "1", "value": "1" };
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Get_User_Single(' + queryData + ')').then(response => {
            return callBack(null, response);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    updateUser: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL User_Update(' + queryData + ')').then(response => {
            var response = JSON.parse(response[0].message);
            return callBack(null, response);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    deleteUser: (data, callBack) => {
        var dataP = { "field": "id", "value": id };
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(dataP).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL User_Delete(' + queryData + ')').then(response => {
            var response = JSON.parse(response[0].message);
            return callBack(null, response);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    }
};
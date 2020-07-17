const sequelize = require('./../config/database');

module.exports = {
    create: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Bundle_Insert(' + queryData + ')').then(response => {
            var response = response[0].message;
            return callBack(null, response);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    update: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Bundle_Update(' + queryData + ')').then(response => {
            var response = response[0].message;
            return callBack(null, response);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    deleteA: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Bundle_Delete(' + queryData + ')').then(response => {
            var response = response[0].message;
            return callBack(null, response);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    single: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Bundle_Single(' + queryData + ')').then(response => {
            var response = response[0];
            if (response) {
                sequelize.query('CALL Bundle_Products(' + response.id + ')').then(responseProduct => {
                    response.productData = responseProduct;
                    return callBack(null, response);
                });
            }
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    all: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Bundle_All(' + queryData + ')').then(response => {
            var response = response;
            sequelize.query('CALL Bundle_Count(' + queryData + ')').then(count => {
                return callBack(null, { "response": response, "count": count });
            });
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    featured: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Bundle_Update_Featured(' + queryData + ')').then(response => {
            var response = response[0].message;
            return callBack(null, response);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    changeStatus: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Bundle_Update_Status(' + queryData + ')').then(response => {
            var response = response[0].message;
            return callBack(null, response);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    stock: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Bundle_Update_Stock(' + queryData + ')').then(response => {
            var response = response[0].message;
            return callBack(null, response);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    discount: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Bundle_Update_Discount(' + queryData + ')').then(response => {
            var response = response[0].message;
            return callBack(null, response);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    tax: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Bundle_Update_Tax(' + queryData + ')').then(response => {
            var response = response[0].message;
            return callBack(null, response);
        }).catch(error => {
            callBack({ "name": error.name, "message": error.original.sqlMessage });
        });
    },

    importProduct: (data, created_by, callBack) => {
        recursive(data.products, -1, created_by, callBack);
    }
};

function recursive(result, i, created_by, callBack) {
    i++;
    if (i === result.length) {
        callBack(null, { "status": true, "data": result, "message": "Data imported successfully." });
    }
    else {
        result[i].created_by = created_by;
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(result[i]).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Bundle_Import(' + queryData + ') ')
            .then(function (response) {
                if (response) {
                    recursive(result, i, created_by, callBack);
                }
                else {
                    recursive(result, i, created_by, callBack);
                }
            }).catch(error => {
                callBack({ "name": error.name, "message": error.original.sqlMessage });
            });
    }
}
const sequelize = require('./../config/database');

module.exports = {
    details: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Home_Slider(' + queryData + ')').then(slider => {
            response = {};
            sequelize.query('CALL Home_Cuisine(' + queryData + ')').then(cuisine => {
                sequelize.query('CALL Home_Populor(' + queryData + ')').then(popular => {
                    sequelize.query('CALL Home_Most_Populor(' + queryData + ')').then(most_popular => {
                        response = {
                            "slider": slider,
                            "cuisine": cuisine,
                            "popular": popular,
                            "most_popular": most_popular
                        }
                        return callBack(null, response);
                    });
                });
            });
            
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },
    vendor: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Home_Vendor_Single(' + queryData + ')').then(response => {
            var response = response;
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },
    products: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Home_Vendor_Products(' + queryData + ')').then(response => {
            var response = response;
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },
    listing: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        response = {};
        sequelize.query('CALL Home_Listing_Category(' + queryData + ')').then(categories => {
            sequelize.query('CALL Home_Listing_Sub_Category(' + queryData + ')').then(sub_categories => {
                sequelize.query('CALL Home_Listing_Brand(' + queryData + ')').then(brands => {
                    sequelize.query('CALL Home_Listing_Most_Popular(' + queryData + ')').then(most_popular => {
                        sequelize.query('CALL Home_Listing_Top(' + queryData + ')').then(top => {
                            sequelize.query('CALL Home_Listing_Products(' + queryData + ')').then(products => {
                                response = {
                                    "categories": categories,
                                    "sub_categories": sub_categories,
                                    "brands": brands,
                                    "most_popular": most_popular,
                                    "top": top,
                                    "products": products
                                }
                                return callBack(null, response);
                            });
                        });
                    });
                });
            });
            
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },
    filter: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data).replace(/[\/\(\)\']/g, "\\$&") + '"'.replace(/"/g, "'");
        sequelize.query('CALL Home_Listing_Products(' + queryData + ')').then(response => {
            var response = response;
            return callBack(null, response);
        }).catch(error => {
            callBack({"name": error.name, "message": error.original.sqlMessage });
        });
    },
};
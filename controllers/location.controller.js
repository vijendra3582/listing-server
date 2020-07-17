const {
    country,
    state,
    city
} = require('./../models/location.model');

exports.country = (req, res, next) => {
    var body = req.body;
    country(body, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }
        
        return res.status(200).json({
            status: true,
            countries: result
        });
    });
}

exports.state = (req, res, next) => {
    var country_id = Number(req.params.country_id);
    state(country_id, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }
        
        return res.status(200).json({
            status: true,
            states: result
        });
    });
}

exports.city = (req, res, next) => {
    var state_id = Number(req.params.state_id);
    city(state_id, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }
        
        return res.status(200).json({
            status: true,
            cities: result
        });
    });
}
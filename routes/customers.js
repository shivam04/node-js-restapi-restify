const errors = require('restify-errors');
const Customer = require('../models/Customer');
module.exports = server => {
    //get customers
    server.get('/customers', async (req, res, next) => {
        try{
            const customers = await Customer.find({});
            res.send(customers);
            next();
        }catch (err) {
            return next(new errors.InvalidContent(err));
        }
    });

    //get single customer
    server.get('/customers/:id', async (req, res, next) => {
        try{
            const customers = await Customer.findById(req.params.id);
            res.send(customers);
            next();
        }catch (err) {
            return next(new errors.ResourceNotFound(`There is no customer with id of ${req.params.id}`));
        }
    });

    //add customers
    server.post('/customers', async (req, res, next) => {
        if(!req.is('application/json')) {
            return next(new errors.InvalidContent("Expects 'application/json'"));
        }
        const {name, email, balance} = req.body;

        const customer = new Customer({
            name,
            email,
            balance
        });
        try {
            const newCustomer = await customer.save();
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.Internal(err.message));
        }
    });

    //update customer
    server.put(
        '/customers/:id',
        async (req, res, next) => {
            // Check for JSON
            if (!req.is('application/json')) {
                return next(
                    new errors.InvalidContent("Expects 'application/json'")
                );
            }

            try {
                const customer = await Customer.findOneAndUpdate(
                    { _id: req.params.id },
                    req.body
                );
                res.send(200);
                next();
            } catch (err) {
                return next(
                    new errors.ResourceNotFound(
                        `There is no customer with the id of ${req.params.id}`
                    )
                );
            }
        }
    );

    //delete customer
    // Delete Customer
    server.del(
        '/customers/:id',
        async (req, res, next) => {
            try {
                const customer = await Customer.findOneAndRemove({
                    _id: req.params.id
                });
                res.send(204);
                next();
            } catch (err) {
                return next(
                    new errors.ResourceNotFound(
                        `There is no customer with the id of ${req.params.id}`
                    )
                );
            }
        }
    );

};
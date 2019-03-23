const express = require('express');
const router = express.Router();
const Token = require('../../models/Token');
const plaid = require('plaid');
const User = require('../../models/User');
const Transaction = require('../../models/Transaction');
const moment = require('moment');

var PLAID_CLIENT_ID = '5c6c2cde09ec71001165f32f';
var PLAID_SECRET = '583e979e33f582c2f01ef399ddfe6d';
var PLAID_PUBLIC_KEY = '769c3c53309e98f14022953805fc69';
var PLAID_ENV = 'sandbox';
// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
var PLAID_PRODUCTS = 'transactions';

var client = new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    plaid.environments[PLAID_ENV],
    { version: '2018-05-22' }
);

router.post('/get_access_token', function (req, res, next) {
    let PUBLIC_TOKEN = req.body.public_token;
    client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
        if (error) {
            return res.json({
                error: error,
            });
        }
        let data = tokenResponse;
        tokenResponse.user_id = req.body.user_id;
        Token.update({ user_id: tokenResponse.user_id }, tokenResponse, { upsert: true }).then(function (data) {
            res.json(tokenResponse);
        }).catch(next);
    });
})

router.get('/identity', function (request, response, next) {
    User.findOne({ email: request.body.email }).then((data) => {
        return Token.findOne({ user_id: data._id })
    }).then((data) => {
        client.getIdentity(data.access_token, function (error, identityResponse) {
            response.json({ error: error, identity: identityResponse });
        });
    }).catch((err) => {
        res.json(err, 400);
    });
});

router.get('/accounts', function (request, response, next) {
    User.findOne({ email: request.body.email }).then((data) => {
        return Token.findOne({ user_id: data._id })
    }).then((data) => {
        client.getAccounts(data.access_token, function (error, accountsResponse) {
            response.json({ error: error, accounts: accountsResponse.accounts });
        });
    }).catch((err) => {
        res.json(err, 400);
    });
});

router.post('/transactions', function (request, response, next) {
    User.findOne({ email: request.body.email }).then((data) => {
        return Token.findOne({ user_id: data._id })
    }).then((data) => {
        var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        var endDate = moment().format('YYYY-MM-DD');
        client.getTransactions(data.access_token, startDate, endDate, {
            count: 250,
            offset: 0,
        }, function (error, transactionsResponse) {
            if (error != null) {
                console.log('plaid error')
                return response.json({
                    error: error
                });
            } else {
                let transactions = transactionsResponse.transactions;
                Transaction.create(transactions).finally(()=> {
                    response.json({ error: null, transactions });
                });
            }
        });
    }).catch((err) => {
        response.json(err, 400);
    });
});


module.exports = router;
const express = require('express');
const router = express.Router();
const Token = require('../../models/token');
const plaid = require('plaid');

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
        Token.create(tokenResponse).then(function (data) {
            res.json(tokenResponse);
        }).catch(next);
    });
})

router.get('/identity', function (request, response, next) {
    client.getIdentity("access-sandbox-bde544f2-d232-4e55-ba52-707ae7ab0099", function (error, identityResponse) {
        response.json({ error: error, identity: identityResponse });
    });
});

module.exports = router;
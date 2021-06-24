const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config');
const bunyan = require('bunyan');
const log = bunyan.createLogger({
    name: 'OIDC Web Application'
});
//-----------------------------------------------------------------------------
// Set up the route controller
//
// 1. For 'login' route and 'returnURL' route, use `passport.authenticate`.
// This way the passport middleware can redirect the user to login page, receive
// id_token etc from returnURL.
//
// 2. For the routes you want to check if user is already logged in, use
// `ensureAuthenticated`. It checks if there is an user stored in session, if not
// it will call `passport.authenticate` to ask for user to log in.
//-----------------------------------------------------------------------------
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

router.get('/', function (req, res) {
    console.log(" URL: '/' \n req.user \n\n", req.user, '$$$ end \n\n');
});

router.get('/error', function (req, res) {
    res.json({error: 'error'});
});

// '/account' is only available to logged in user
router.get('/account', ensureAuthenticated, function (req, res) {
    console.log("$$$ req.user.data \n\n", req.user, '$$$ end \n\n');

    res.json({user: req.user});
});

router.get('/login',
    function (req, res, next) {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,                      // required
                resourceURL: config.resourceURL,    // optional. Provide a value if you want to specify the resource.
                customState: 'my_state',            // optional. Provide a value if you want to provide custom state value.
                failureRedirect: '/error',
            },
            function(req, res) {
                res.redirect('http://localhost:3000/');
            }
        )
        // (req, res, next);
    },
    function (req, res) {
        log.info('Login was called in the Sample');
        res.redirect('http://localhost:3000/')
    })


// 'GET returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// query (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
router.get('/auth/openid/return',
    function (req, res, next) {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,    // required
                failureRedirect: '/'
            }
        )(req, res, next);
    },
    function (req, res) {
        log.info('We received a return from AzureAD.');
        res.redirect('http://localhost:3000/');
    });

// 'POST returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// body (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
router.post('/auth/openid/return',
    function (req, res, next) {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,    // required
                failureRedirect: '/'
            }
        )(req, res, next);
    },
    function (req, res) {
        log.info('We received a return from AzureAD.');
        res.redirect('http://localhost:3000/');
    });

// 'logout' route, logout from passport, and destroy the session with AAD.
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        req.logOut();
        res.redirect(config.destroySessionUrl);
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');
var middleware = require('../middleware/userMiddleware');

var passport = require('passport');
var LocalStragegy = require('passport-local').Strategy;

//setting passport local stragegy
passport.use(new LocalStragegy(userCtrl.localStragegy));

passport.serializeUser(userCtrl.serializeUser);

passport.deserializeUser(userCtrl.deserializeUser);

//get pages for user
router.get('/login',  userCtrl.getLoginPage);

router.get('/logout', middleware.authentication, userCtrl.logout);

router.get('/profile', middleware.authentication, userCtrl.getProfilePage);
router.get('/profile/history-transaction', middleware.authentication, userCtrl.getHistoryTransPage);
router.get('/profile/history-transaction/:oid', middleware.authentication, userCtrl.getDetailHisTran);

//process form udpate profile
router.post('/profile/update', middleware.authentication, userCtrl.updateProfile);
router.post('/profile/changePass', middleware.authentication, userCtrl.changePassword);
//process form login + signup
router.post('/signup', userCtrl.signup);

router.post('/login', passport.authenticate('local', {successRedirect: '/loggedin', failureRedirect: '/login', failureFlash: true}), userCtrl.login);

module.exports = router;
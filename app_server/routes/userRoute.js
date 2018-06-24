var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');

var passport = require('passport');
var LocalStragegy = require('passport-local').Strategy;

//setting passport local stragegy
passport.use(new LocalStragegy(userCtrl.localStragegy));

passport.serializeUser(userCtrl.serializeUser);

passport.deserializeUser(userCtrl.deserializeUser);

//get pages for user
router.get('/login', userCtrl.getLoginPage);

router.get('/logout', userCtrl.logout);

//process form login + signup
router.post('/signup', userCtrl.signup);

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: true}), userCtrl.login);

module.exports = router;

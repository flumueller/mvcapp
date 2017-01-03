var express = require('express');
var stormpath = require('express-stormpath');
var router = express.Router();

var controller = require('./controllers/news.controller.js')

router.get('/',stormpath.loginRequired , controller.newsList);
router.get('/item/add', stormpath.loginRequired, controller.newsForm);
router.post('/item/add', stormpath.loginRequired, controller.newsAdd);
router.post('/item/edit/:id', stormpath.loginRequired, controller.newsEdit);
router.get('/item/delete/:id', stormpath.loginRequired, controller.newsDelete);
router.get('/item/:id', stormpath.loginRequired, controller.newsDetails);

module.exports = router;
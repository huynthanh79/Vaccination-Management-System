const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');


router.get('/injection-point', siteController.showInjectionPoint);

router.get('/', siteController.home);

module.exports = router;

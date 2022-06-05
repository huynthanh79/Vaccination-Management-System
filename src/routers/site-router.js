const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/view-employee', siteController.showViewEmployee);

router.get('/injection-information', siteController.showInjectionInformation);

router.get('/injection-point', siteController.showInjectionPoint);

router.get('/', siteController.home);

module.exports = router;

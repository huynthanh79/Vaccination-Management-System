const express = require('express');
const router = express.Router();

const injectionPointController = require('../app/controllers/InjectionPointController');


router.post('/store', injectionPointController.storeInjectionPoint);

router.get('/', injectionPointController.showInjectionPointFrom);

module.exports = router;

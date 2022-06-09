const express = require('express');
const router = express.Router();

const injectionInformationController = require('../app/controllers/InjectionInforController');


router.post('/store', injectionInformationController.storeInjectionInformation);

router.get('/', injectionInformationController.showInjectionInformationFrom);



module.exports = router;

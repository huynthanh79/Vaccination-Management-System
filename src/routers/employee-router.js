const express = require('express');
const router = express.Router();

const employeeController = require('../app/controllers/EmployeeController');

router.get('/create-order-form', employeeController.showOrderForm);

router.post('/registration-form/store', employeeController.storeRegistrationForm);

router.post('/order/store', employeeController.storeOrder);

router.get('/create-registration-form', employeeController.showCreateRegistrationForm);

router.get('/view-registration-list', employeeController.showRegistrationList);

module.exports = router;

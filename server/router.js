let express = require('express');
let router = express.Router();
 
const customers = require('./controller.js');
const reparateurs = require('./controller.js');
const interventions =  require('./controller.js');

router.post('/crud/customer', customers.createCustomer);
router.get('/crud/customer/:id', customers.getCustomer);
router.get('/crud/customers', customers.customers);
router.put('/crud/customer', customers.updateCustomer);
router.delete('/crud/customer/:id', customers.deleteCustomer);

router.get('/crud/reparateurs', reparateurs.reparateurs);

router.post('/crud/intervention', interventions.createIntervention);
router.get('/crud/interventions', interventions.interventions);
router.get('/crud/uintervention/:id', interventions.getInt);

module.exports = router;
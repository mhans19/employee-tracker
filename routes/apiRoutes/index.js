// DEPENDENCIES
const express = require('express');
const router = express.Router();
// ROUTES
router.use(require('./employeeRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./departmentRoutes'));
// EXPORT
module.exports = router;
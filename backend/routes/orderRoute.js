const express = require("express");
const { createNewOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.post('/new',isAuthenticatedUser, createNewOrder)
router.get('/status/:id',isAuthenticatedUser, getSingleOrder)
router.get('/all',isAuthenticatedUser, myOrders)

router.get('/admin/orders', isAuthenticatedUser, authorizeRoles('admin'), getAllOrders)
router.put('/admin/order/:id', isAuthenticatedUser, authorizeRoles('admin'), updateOrder);
router.delete('/admin/order/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);


module.exports = router;

import express from 'express'

import { forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registercontroller, testController, updateProfileController } from '../controllers/authController.js';
import { adminCheck, requireSignIn } from '../middlewares/authMiddleware.js';
const router = express.Router();

//register
router.post('/register' ,registercontroller)

//login
router.post('/login' ,loginController)

 
//middleware protected route
router.get('/test' ,requireSignIn, adminCheck, testController)
//prottected route auth
router.get('/user-auth' ,requireSignIn,(req ,res)=>{
    res.status(200).send({ok:true})
})
//forgot password
router.post('/forgot-password' ,forgotPasswordController)
//admin protect route
router.get('/admin-auth' ,requireSignIn, adminCheck ,(req ,res)=>{
    res.status(200).send({ok : true})
})

//////////////////
//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get('/orders' ,requireSignIn ,getOrdersController)

//all orders
router.get("/all-orders", requireSignIn, adminCheck, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  adminCheck,
  orderStatusController
);


export default router;
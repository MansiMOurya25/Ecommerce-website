import express from 'express'
import { adminCheck, requireSignIn } from '../middlewares/authMiddleware.js';
import { createCategoryController, deleteCategoryController, getAllCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router()
// routes
//create category route
router.post('/create-category' ,requireSignIn ,adminCheck , createCategoryController)
// update category route
router.put('/update-category/:id' , requireSignIn ,adminCheck, updateCategoryController)

//get all category route
router.get('/get-category' , getAllCategoryController)
//get single category route
router.get('/single-category/:slug' , singleCategoryController)
//delet category
router.delete('/delete-category/:id' , requireSignIn, adminCheck,deleteCategoryController)

export default router ;
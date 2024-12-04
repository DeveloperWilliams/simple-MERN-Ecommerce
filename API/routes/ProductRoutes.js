import express from 'express';
import AuthToken from '../middleware/Auth.js';
import { isAdmin, isSuperAdmin } from '../middleware/Auth.js';


// Import the Product controllers
import { createProduct, updateProduct, deleteProduct, getProductsByCategory } from '../controllers/Product.js';

const router = express.Router();



router.post('/create', AuthToken, isAdmin, createProduct);
router.put('/update/:id', AuthToken, isAdmin, updateProduct);
router.delete('/delete/:id', AuthToken, isSuperAdmin, deleteProduct);
router.get('/category/:category', getProductsByCategory);

export default router;

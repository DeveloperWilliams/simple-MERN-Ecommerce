import express from 'express';
import AuthToken from '../middleware/Auth.js';
import { isAdmin, isSuperAdmin } from '../middleware/Auth.js';


// Import the Product controllers
import { createProduct, updateProduct, deleteProduct } from '../controllers/Product.js';

const router = express.Router();



router.post('/create', AuthToken, isAdmin, createProduct);
router.put('/update/:id', AuthToken, isAdmin, updateProduct);
router.delete('/delete/:id', AuthToken, isSuperAdmin, deleteProduct);

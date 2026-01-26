import { Router } from 'express';
import * as productController from '../controllers/productController';

const router = Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);

export default router;

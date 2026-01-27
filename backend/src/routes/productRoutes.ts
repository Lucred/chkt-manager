import { Router } from 'express';
import * as productController from '../controllers/productController';

const productRouter = Router();

productRouter.get('/', productController.getAllProducts);
productRouter.post('/', productController.createProduct);

export default productRouter;

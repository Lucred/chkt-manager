import { Router } from 'express';
import * as adminController from '../controllers/adminController';

const adminRouter = Router();

adminRouter.get('/checkouts', adminController.getAllCheckouts);
adminRouter.get('/carts', adminController.getAllCarts);

export default adminRouter;

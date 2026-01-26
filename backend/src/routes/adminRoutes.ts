import { Router } from 'express';
import * as adminController from '../controllers/adminController';

const router = Router();

router.get('/checkouts', adminController.getAllCheckouts);
router.get('/carts', adminController.getAllCarts);

export default router;

import { Router } from 'express';
import * as cartController from '../controllers/cartController';

const router = Router();

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.delete('/remove/:orderItemId', cartController.removeFromCart);
router.post('/checkout', cartController.checkout);
router.get('/orders', cartController.getUserOrders);

export default router;

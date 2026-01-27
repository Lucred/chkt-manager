import { Router } from 'express';
import * as cartController from '../controllers/cartController';

const cartRouter = Router();

cartRouter.get('/', cartController.getCart);
cartRouter.post('/add', cartController.addToCart);
cartRouter.delete('/remove/:orderItemId', cartController.removeFromCart);
cartRouter.post('/checkout', cartController.checkout);
cartRouter.get('/orders', cartController.getUserOrders);

export default cartRouter;

import { Request, Response } from 'express';
import * as cartService from '../services/cartService';

// Helper to simulate getting user ID from request (e.g. headers or mock auth)
const getUserId = (req: Request): number => {
    // For simplicity, we assume a header 'x-user-id' is passed
    const userId = req.headers['x-user-id'];
    if (!userId) return 0; // Invalid or guest
    return parseInt(userId as string, 10);
};

export const getCart = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'User ID required' });

  try {
    const cart = await cartService.getCart(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { productId, quantity } = req.body;
  if (!userId) return res.status(401).json({ error: 'User ID required' });

  try {
    const item = await cartService.addToCart(userId, productId, quantity || 1);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
    const userId = getUserId(req);
    const { orderItemId } = req.params;
    if (!userId) return res.status(401).json({ error: 'User ID required' });
    if (!orderItemId || typeof orderItemId !== 'string') return res.status(400).json({ error: 'Order Item ID required' });

    try {
        await cartService.removeFromCart(userId, parseInt(orderItemId));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove from cart' });
    }
}

export const checkout = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'User ID required' });

  try {
    const order = await cartService.checkout(userId);
    res.json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Checkout failed' });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: 'User ID required' });

    try {
        const orders = await cartService.getUserOrders(userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
}

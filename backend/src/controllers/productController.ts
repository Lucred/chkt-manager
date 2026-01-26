import { Request, Response } from 'express';
import * as productService from '../services/productService';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const creatorId = req.query.creatorId ? parseInt(req.query.creatorId as string) : undefined;
    const products = await productService.getAllProducts(creatorId);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, price } = req.body;
    const userId = req.headers['x-user-id'];
    const adminId = userId ? parseInt(userId as string, 10) : undefined;

    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    try {
        const product = await productService.createProduct(name, parseFloat(price), adminId);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
}

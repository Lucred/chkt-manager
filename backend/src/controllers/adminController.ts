import { Request, Response } from 'express';
import * as adminService from '../services/adminService';

export const getAllCheckouts = async (req: Request, res: Response) => {
  try {
    const checkouts = await adminService.getAllCheckouts();
    res.json(checkouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch checkouts' });
  }
};

export const getAllCarts = async (req: Request, res: Response) => {
    try {
        const carts = await adminService.getAllCarts();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch carts' });
    }
}

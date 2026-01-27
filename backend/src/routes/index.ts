import express from "express";
import productRouter from "./productRoutes";
import cartRouter from "./cartRoutes";
import adminRouter from "./adminRoutes";

// Init router and path
const mainRouter = express.Router();

// Routes
mainRouter.use('/api/products', productRouter);
mainRouter.use('/api/cart', cartRouter);
mainRouter.use('/api/admin', adminRouter);

export default mainRouter;

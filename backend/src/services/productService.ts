import prisma from '../prisma';

export const getAllProducts = async (adminId?: number) => {
  if (adminId) {
    return await prisma.product.findMany({
      where: {
        createdById: adminId
      }
    });
  }
  return await prisma.product.findMany();
};

export const createProduct = async (name: string, price: number, adminId?: number) => {
  return await prisma.product.create({
    data: {
      name,
      price,
      createdById: adminId
    },
  });
};

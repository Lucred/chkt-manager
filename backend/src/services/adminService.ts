import prisma from '../prisma';

export const getAllCheckouts = async () => {
  return await prisma.order.findMany({
    where: {
      status: 'CHECKOUT',
    },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getAllCarts = async () => {
    return await prisma.order.findMany({
        where: {
            status: 'CART'
        },
        include: {
            user: true,
            items: {
                include: {
                    product: true
                }
            }
        }
    })
}

import prisma from '../prisma';

export const getCart = async (userId: number) => {
  let cart = await prisma.order.findFirst({
    where: {
      userId,
      status: 'CART',
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.order.create({
      data: {
        userId,
        status: 'CART',
      },
      include: {
        items: {
          include: {
            product: true
          }
        },
      },
    });
  }

  return cart;
};

export const addToCart = async (userId: number, productId: number, quantity: number) => {
  const cart = await getCart(userId);

  const existingItem = await prisma.orderItem.findFirst({
    where: {
      orderId: cart.id,
      productId,
    },
  });

  if (existingItem) {
    return await prisma.orderItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    return await prisma.orderItem.create({
      data: {
        orderId: cart.id,
        productId,
        quantity,
      },
    });
  }
};

export const removeFromCart = async (userId: number, orderItemId: number) => {
  // Ensure the item belongs to the user's cart
  const cart = await getCart(userId);
  const item = await prisma.orderItem.findFirst({
      where: {
          id: orderItemId,
          orderId: cart.id
      }
  })

  if (!item) {
      throw new Error("Item not found in user's cart")
  }

  return await prisma.orderItem.delete({
    where: { id: orderItemId },
  });
};

export const checkout = async (userId: number) => {
  const cart = await getCart(userId);
  
  if (cart.items.length === 0) {
      throw new Error("Cart is empty");
  }

  return await prisma.order.update({
    where: { id: cart.id },
    data: {
      status: 'CHECKOUT',
      createdAt: new Date(), // Update timestamp to checkout time
    },
  });
};

export const getUserOrders = async (userId: number) => {
    return await prisma.order.findMany({
        where: {
            userId,
            status: 'CHECKOUT'
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

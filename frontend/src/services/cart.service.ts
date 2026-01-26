import api from './apiClient';

export const getCart = (userId: number) => api.get('/cart', {
    headers: { 'x-user-id': userId }
});

export const addToCart = (userId: number, productId: number, quantity: number = 1) => api.post('/cart/add', {
    productId,
    quantity
}, {
    headers: { 'x-user-id': userId }
});

export const removeFromCart = (userId: number, orderItemId: number) => api.delete(`/cart/remove/${orderItemId}`, {
    headers: { 'x-user-id': userId }
});

export const checkout = (userId: number) => api.post('/cart/checkout', {}, {
    headers: { 'x-user-id': userId }
});

export const getUserOrders = (userId: number) => api.get('/cart/orders', {
    headers: { 'x-user-id': userId }
});

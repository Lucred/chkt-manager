import api from './apiClient';

export const getProducts = (adminId?: number) => {
    if (adminId) {
        return api.get(`/products?creatorId=${adminId}`);
    }
    return api.get('/products');
};

export const createProduct = (name: string, price: number, adminId?: number) => {
    const config = adminId ? { headers: { 'x-user-id': adminId } } : {};
    return api.post('/products', {
        name,
        price
    }, config);
};

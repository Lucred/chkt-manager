import api from './apiClient';

export const getAdminCheckouts = () => api.get('/admin/checkouts');
export const getAdminCarts = () => api.get('/admin/carts');

import { useState, useEffect } from 'react';
import * as adminService from '../services/admin.service';
import * as productService from '../services/product.service';
import Header from '../components/Header';
import TabNav from '../components/TabNav';
import OrderList, { type Order } from '../components/OrderList';
import type { Product } from '../components/ProductItem';

interface AdminViewProps {
    userId: number;
    onLogout: () => void;
}

const AdminView = ({ userId, onLogout }: AdminViewProps) => {
    const [checkouts, setCheckouts] = useState<Order[]>([]);
    const [carts, setCarts] = useState<Order[]>([]);
    const [myProducts, setMyProducts] = useState<Product[]>([]);
    const [activeTab, setActiveTab] = useState<'checkouts' | 'carts' | 'products'>('checkouts');
    
    // Product creation state
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');

    useEffect(() => {
        loadData();
    }, [userId]);

    const loadData = async () => {
        try {
            const [checkoutsRes, cartsRes, productsRes] = await Promise.all([
                adminService.getAdminCheckouts(),
                adminService.getAdminCarts(),
                productService.getProducts(userId)
            ]);
            setCheckouts(checkoutsRes.data);
            setCarts(cartsRes.data);
            setMyProducts(productsRes.data);
        } catch (error) {
            console.error("Failed to load admin data", error);
        }
    };

    const handleCreateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProductName || !newProductPrice) return;

        try {
            await productService.createProduct(newProductName, parseFloat(newProductPrice), userId);
            alert('Product created successfully!');
            setNewProductName('');
            setNewProductPrice('');
            // Reload products
            const res = await productService.getProducts(userId);
            setMyProducts(res.data);
        } catch (error) {
            console.error('Failed to create product', error);
            alert('Failed to create product');
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
            <Header title="Admin Dashboard" onLogout={onLogout} />

            <TabNav 
                tabs={[
                    { id: 'checkouts', label: `Completed Checkouts (${checkouts.length})` },
                    { id: 'carts', label: `Active Carts (${carts.length})` },
                    { id: 'products', label: 'Manage Products' }
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="bg-gray-50 p-6 rounded-lg border">
                {activeTab === 'checkouts' && (
                    <OrderList orders={checkouts} title="All User Checkouts" showUser={true} />
                )}
                
                {activeTab === 'carts' && (
                    <OrderList orders={carts} title="Current User Carts" showUser={true} emptyMessage="No active carts." />
                )}

                {activeTab === 'products' && (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded shadow-sm border max-w-lg">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Product</h2>
                            <form onSubmit={handleCreateProduct} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        value={newProductName}
                                        onChange={(e) => setNewProductName(e.target.value)}
                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g. Milk"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={newProductPrice}
                                        onChange={(e) => setNewProductPrice(e.target.value)}
                                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
                                >
                                    Create Product
                                </button>
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded shadow-sm border">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">My Created Products</h2>
                            {myProducts.length === 0 ? (
                                <p className="text-gray-500 italic">You haven't created any products yet.</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {myProducts.map(product => (
                                        <div key={product.id} className="border p-4 rounded bg-white shadow-sm flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                                                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                                            </div>
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">ID: {product.id}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminView;

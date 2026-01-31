import { useState, useEffect } from 'react';
import * as productService from '../services/product.service';
import * as cartService from '../services/cart.service';
import Header from '../components/Header';
import TabNav from '../components/TabNav';
import ProductItem, { type Product } from '../components/ProductItem';
import OrderList, { type Order, type CartItem } from '../components/OrderList';

interface UserViewProps {
  userId: number;
  onLogout: () => void;
}

const UserView = ({ userId, onLogout }: UserViewProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'shop' | 'cart' | 'orders'>('shop');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    loadProducts();
    loadCart();
    loadOrders();
  }, [userId]);

  const loadProducts = async () => {
    try {
      const res = await productService.getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to load products', error);
    }
  };

  const loadCart = async () => {
    try {
      const res = await cartService.getCart(userId);
      setCart(res.data.items || []);
    } catch (error) {
      console.error('Failed to load cart', error);
    }
  };

  const loadOrders = async () => {
      try {
          const res = await cartService.getUserOrders(userId);
          setOrders(res.data);
      } catch (error) {
          console.error("Failed to load orders", error);
      }
  }

  const handleAddToCart = async (product: Product) => {
    try {
      await cartService.addToCart(userId, product.id);
      await loadCart();
    } catch (error) {
      console.error('Failed to add to cart', error);
    }
  };

  const handleUpdateQuantity = async (productId: number, delta: number) => {
    try {
      await cartService.addToCart(userId, productId, delta);
      await loadCart();
    } catch (error) {
      console.error('Failed to update quantity', error);
    }
  };

  const handleRemoveFromCart = async (itemId: number) => {
    try {
      await cartService.removeFromCart(userId, itemId);
      await loadCart();
    } catch (error) {
      console.error('Failed to remove from cart', error);
    }
  };

  const handleCheckout = async () => {
    try {
      await cartService.checkout(userId);
      await loadCart();
      await loadOrders();
      alert('Checkout successful!');
      setActiveTab('orders');
    } catch (error) {
      console.error('Checkout failed', error);
      alert('Checkout failed');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <Header title={`Welcome User #${userId}`} onLogout={onLogout} />

      <TabNav 
        tabs={[
            { id: 'shop', label: 'Shop' },
            { id: 'cart', label: `Cart (${cart.length})` },
            { id: 'orders', label: 'My Orders' }
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === 'shop' && (
        <div className="space-y-4">
            <div className="flex justify-end mb-4">
                <div className="bg-white rounded-lg shadow-sm border p-1 flex">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                    >
                        Grid
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                    >
                        List
                    </button>
                </div>
            </div>
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "space-y-4"}>
            {products.map((p) => {
                const cartItem = cart.find(item => item.product.id === p.id);
                const quantity = cartItem ? cartItem.quantity : 0;
                return (
                    <ProductItem 
                        key={p.id} 
                        product={p} 
                        onAddToCart={handleAddToCart} 
                        onUpdateQuantity={(product, delta) => handleUpdateQuantity(product.id, delta)}
                        cartQuantity={quantity}
                        viewMode={viewMode}
                    />
                );
            })}
            </div>
        </div>
      )}

      {activeTab === 'cart' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200 mb-6">
                {cart.map((item) => (
                  <li key={item.id} className="py-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <p className="font-bold text-lg">${(item.product.price * item.quantity).toFixed(2)}</p>
                        <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 font-medium"
                        >
                            Remove
                        </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-4 flex justify-between items-center">
                  <p className="text-xl font-bold text-gray-900">
                      Total: ${cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
                  </p>
                  <button
                    onClick={handleCheckout}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition shadow-sm font-semibold"
                  >
                    Checkout
                  </button>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
          <OrderList orders={orders} title="Your Past Orders" emptyMessage="No past orders." />
      )}
    </div>
  );
};

export default UserView;

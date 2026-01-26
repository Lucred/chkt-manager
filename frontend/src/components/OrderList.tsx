import React from 'react';

export interface CartItem {
    id: number;
    product: {
        id: number;
        name: string;
        price: number;
    };
    quantity: number;
}

export interface Order {
    id: number;
    items: CartItem[];
    createdAt: string;
    user?: { id: number; name: string };
}

interface OrderListProps {
    orders: Order[];
    title: string;
    emptyMessage?: string;
    showUser?: boolean;
}

const OrderList: React.FC<OrderListProps> = ({ orders, title, emptyMessage = "No orders found.", showUser = false }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
            {orders.length === 0 ? (
                <p className="text-gray-500 italic">{emptyMessage}</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="border p-4 rounded bg-white shadow-sm hover:shadow-md transition duration-200">
                        <div className="flex justify-between items-start mb-2 border-b pb-2">
                            <div>
                                <span className="font-bold text-lg text-gray-800">Order #{order.id}</span>
                                {showUser && order.user && (
                                    <p className="text-sm text-gray-600">User: {order.user.name} (ID: {order.user.id})</p>
                                )}
                            </div>
                            <span className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <div className="mt-2">
                            <ul className="space-y-1">
                                {order.items.map(item => (
                                    <li key={item.id} className="flex justify-between text-sm text-gray-700">
                                        <span>{item.product.name} x {item.quantity}</span>
                                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-3 pt-2 border-t text-right font-bold text-lg text-gray-900">
                            Total: ${order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderList;

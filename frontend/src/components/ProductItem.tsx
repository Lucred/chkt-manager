import React from 'react';

export interface Product {
    id: number;
    name: string;
    price: number;
}

interface ProductItemProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onUpdateQuantity?: (product: Product, delta: number) => void;
    cartQuantity?: number;
    viewMode: 'grid' | 'list';
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart, onUpdateQuantity, cartQuantity = 0, viewMode }) => {
    const renderActions = () => {
        if (cartQuantity > 0 && onUpdateQuantity) {
            return (
                <div className="flex items-center">
                    <button 
                        onClick={() => onUpdateQuantity(product, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l hover:bg-gray-300 transition text-gray-700 font-bold"
                    >
                        -
                    </button>
                    <span className="w-10 h-8 flex items-center justify-center bg-gray-100 border-t border-b border-gray-200 text-sm font-medium">
                        {cartQuantity}
                    </span>
                    <button 
                        onClick={() => onUpdateQuantity(product, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r hover:bg-gray-300 transition text-gray-700 font-bold"
                    >
                        +
                    </button>
                </div>
            );
        }
        return (
            <button
                onClick={() => onAddToCart(product)}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
            >
                Add
            </button>
        );
    };

    if (viewMode === 'list') {
        return (
            <div className="flex justify-between items-center border p-4 rounded bg-white shadow-sm hover:shadow transition duration-200">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </div>
                {renderActions()}
            </div>
        );
    }

    return (
        <div className="border p-4 rounded bg-white shadow hover:shadow-lg transition duration-200 flex flex-col justify-between h-full">
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-lg">${product.price.toFixed(2)}</p>
            </div>
            {cartQuantity > 0 && onUpdateQuantity ? (
                 <div className="flex items-center justify-center w-full">
                    <button 
                        onClick={() => onUpdateQuantity(product, -1)}
                        className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-l hover:bg-gray-300 transition text-gray-700 font-bold"
                    >
                        -
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center bg-gray-100 border-t border-b border-gray-200 text-base font-medium">
                        {cartQuantity}
                    </span>
                    <button 
                        onClick={() => onUpdateQuantity(product, 1)}
                        className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-r hover:bg-gray-300 transition text-gray-700 font-bold"
                    >
                        +
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                >
                    Add to Cart
                </button>
            )}
        </div>
    );
};

export default ProductItem;

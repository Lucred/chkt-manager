import React from 'react';

export interface Product {
    id: number;
    name: string;
    price: number;
}

interface ProductItemProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    viewMode: 'grid' | 'list';
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart, viewMode }) => {
    if (viewMode === 'list') {
        return (
            <div className="flex justify-between items-center border p-4 rounded bg-white shadow-sm hover:shadow transition duration-200">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </div>
                <button
                    onClick={() => onAddToCart(product)}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                >
                    Add
                </button>
            </div>
        );
    }

    return (
        <div className="border p-4 rounded bg-white shadow hover:shadow-lg transition duration-200 flex flex-col justify-between h-full">
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-lg">${product.price.toFixed(2)}</p>
            </div>
            <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductItem;

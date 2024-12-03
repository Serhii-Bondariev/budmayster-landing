// components/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../api/api';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await getProducts();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        await deleteProduct(id);
        setProducts(products.filter((product) => product._id !== id));
    };

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <span>{product.name} - ${product.price}</span>
                        <Link to={`/admin/products/edit/${product._id}`}>Edit</Link>
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;

import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/api';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const loadProducts = useCallback(async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setIsRefreshing(true);
            } else {
                setIsLoading(true);
            }
            setError(null);
            const data = await fetchProducts(30, 0);
            setProducts(data.products || []);
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.message ||
                'Gagal memuat produk. Periksa koneksi internet Anda.';
            setError(message);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const refresh = useCallback(() => {
        loadProducts(true);
    }, [loadProducts]);

    const retry = useCallback(() => {
        loadProducts(false);
    }, [loadProducts]);

    return {
        products,
        isLoading,
        isRefreshing,
        error,
        refresh,
        retry,
    };
};

export default useProducts;

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    useColorScheme,
    StatusBar,
} from 'react-native';
import { getTheme } from '../theme/colors';
import { fetchProductById } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';

const DetailScreen = ({ route }) => {
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark);
    const { product: routeProduct } = route.params;

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProductDetail();
    }, []);

    const loadProductDetail = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchProductById(routeProduct.id);
            setProduct(data);
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.message ||
                'Gagal memuat detail produk.';
            setError(message);
            // Fallback to route props if API fails
            setProduct(routeProduct);
        } finally {
            setIsLoading(false);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Text
                    key={i}
                    style={{ color: i < fullStars ? theme.star : theme.textMuted, fontSize: 18 }}>
                    ★
                </Text>,
            );
        }
        return stars;
    };

    if (isLoading) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <StatusBar
                    barStyle={isDark ? 'light-content' : 'dark-content'}
                    backgroundColor={theme.background}
                />
                <LoadingState message="Memuat detail produk..." />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <StatusBar
                    barStyle={isDark ? 'light-content' : 'dark-content'}
                    backgroundColor={theme.background}
                />
                <EmptyState message="Produk tidak ditemukan" icon="🔍" />
            </View>
        );
    }

    const discountPrice = product.discountPercentage
        ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
        : null;

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={theme.background}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Reusable ProductCard at the top */}
                <ProductCard product={product} style={styles.topCard} />

                {/* Detail Content */}
                <View style={[styles.detailCard, { backgroundColor: theme.surface, shadowColor: theme.shadow }]}>
                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>📝 Deskripsi</Text>
                        <Text style={[styles.description, { color: theme.textSecondary }]}>
                            {product.description}
                        </Text>
                    </View>

                    {/* Info Grid */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>📊 Informasi Produk</Text>
                        <View style={styles.infoGrid}>
                            <View style={[styles.infoItem, { backgroundColor: theme.inputBg }]}>
                                <Text style={styles.infoIcon}>🏷️</Text>
                                <Text style={[styles.infoLabel, { color: theme.textMuted }]}>Brand</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>
                                    {product.brand || '-'}
                                </Text>
                            </View>
                            <View style={[styles.infoItem, { backgroundColor: theme.inputBg }]}>
                                <Text style={styles.infoIcon}>📦</Text>
                                <Text style={[styles.infoLabel, { color: theme.textMuted }]}>Stok</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>
                                    {product.stock} unit
                                </Text>
                            </View>
                            <View style={[styles.infoItem, { backgroundColor: theme.inputBg }]}>
                                <Text style={styles.infoIcon}>⭐</Text>
                                <Text style={[styles.infoLabel, { color: theme.textMuted }]}>Rating</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>
                                    {product.rating?.toFixed(1)} / 5
                                </Text>
                            </View>
                            <View style={[styles.infoItem, { backgroundColor: theme.inputBg }]}>
                                <Text style={styles.infoIcon}>📐</Text>
                                <Text style={[styles.infoLabel, { color: theme.textMuted }]}>SKU</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]} numberOfLines={1}>
                                    {product.sku || '-'}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Price Breakdown */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>💰 Harga</Text>
                        <View style={[styles.priceCard, { backgroundColor: theme.inputBg }]}>
                            <View style={styles.priceRow}>
                                <Text style={[styles.priceLabel, { color: theme.textSecondary }]}>Harga Asli</Text>
                                <Text
                                    style={[
                                        styles.priceValue,
                                        { color: theme.textMuted },
                                        discountPrice && styles.strikethrough,
                                    ]}>
                                    ${product.price}
                                </Text>
                            </View>
                            {discountPrice && (
                                <>
                                    <View style={styles.priceRow}>
                                        <Text style={[styles.priceLabel, { color: theme.textSecondary }]}>Diskon</Text>
                                        <Text style={[styles.priceValue, { color: theme.error }]}>
                                            -{Math.round(product.discountPercentage)}%
                                        </Text>
                                    </View>
                                    <View style={[styles.divider, { backgroundColor: theme.border }]} />
                                    <View style={styles.priceRow}>
                                        <Text style={[styles.priceLabel, styles.finalLabel, { color: theme.text }]}>
                                            Harga Final
                                        </Text>
                                        <Text style={[styles.finalPrice, { color: theme.primary }]}>
                                            ${discountPrice}
                                        </Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>

                    {/* Reviews */}
                    {product.reviews && product.reviews.length > 0 && (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>
                                💬 Ulasan ({product.reviews.length})
                            </Text>
                            {product.reviews.map((review, index) => (
                                <View
                                    key={index}
                                    style={[styles.reviewCard, { backgroundColor: theme.inputBg }]}>
                                    <View style={styles.reviewHeader}>
                                        <Text style={[styles.reviewerName, { color: theme.text }]}>
                                            {review.reviewerName}
                                        </Text>
                                        <View style={styles.reviewStars}>{renderStars(review.rating)}</View>
                                    </View>
                                    <Text style={[styles.reviewComment, { color: theme.textSecondary }]}>
                                        {review.comment}
                                    </Text>
                                    <Text style={[styles.reviewDate, { color: theme.textMuted }]}>
                                        {new Date(review.date).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Tags */}
                    {product.tags && product.tags.length > 0 && (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>🏷️ Tags</Text>
                            <View style={styles.tagsContainer}>
                                {product.tags.map((tag, index) => (
                                    <View
                                        key={index}
                                        style={[styles.tag, { backgroundColor: theme.primaryLight + '20' }]}>
                                        <Text style={[styles.tagText, { color: theme.primary }]}>{tag}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topCard: {
        marginTop: 8,
    },
    detailCard: {
        margin: 16,
        borderRadius: 20,
        padding: 20,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    infoItem: {
        width: '47%',
        padding: 14,
        borderRadius: 14,
        alignItems: 'center',
    },
    infoIcon: {
        fontSize: 24,
        marginBottom: 6,
    },
    infoLabel: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '700',
    },
    priceCard: {
        padding: 16,
        borderRadius: 14,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
    },
    priceLabel: {
        fontSize: 15,
    },
    priceValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    strikethrough: {
        textDecorationLine: 'line-through',
    },
    divider: {
        height: 1,
        marginVertical: 8,
    },
    finalLabel: {
        fontWeight: '700',
        fontSize: 16,
    },
    finalPrice: {
        fontSize: 22,
        fontWeight: '800',
    },
    reviewCard: {
        padding: 14,
        borderRadius: 14,
        marginBottom: 10,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    reviewerName: {
        fontSize: 15,
        fontWeight: '600',
    },
    reviewStars: {
        flexDirection: 'row',
        gap: 2,
    },
    reviewComment: {
        fontSize: 14,
        lineHeight: 21,
        marginBottom: 6,
    },
    reviewDate: {
        fontSize: 12,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
    },
    tagText: {
        fontSize: 13,
        fontWeight: '600',
    },
});

export default DetailScreen;

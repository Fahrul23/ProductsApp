import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    useColorScheme,
} from 'react-native';
import { getTheme } from '../theme/colors';

const ProductCard = ({ product, onPress, style }) => {
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark);

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Text key={i} style={{ color: i < fullStars ? theme.star : theme.textMuted, fontSize: 14 }}>
                    ★
                </Text>,
            );
        }
        return stars;
    };

    const discountPrice = product.discountPercentage
        ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
        : null;

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.shadow }, style]}
            onPress={onPress}
            activeOpacity={0.7}>
            <Image
                source={{ uri: product.thumbnail }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.content}>
                <View style={styles.categoryRow}>
                    <View style={[styles.categoryBadge, { backgroundColor: theme.primaryLight + '20' }]}>
                        <Text style={[styles.categoryText, { color: theme.primary }]}>
                            {product.category}
                        </Text>
                    </View>
                    {product.stock <= 5 && product.stock > 0 && (
                        <View style={[styles.stockBadge, { backgroundColor: theme.warningLight }]}>
                            <Text style={[styles.stockText, { color: theme.warning }]}>
                                Sisa {product.stock}
                            </Text>
                        </View>
                    )}
                </View>
                <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
                    {product.title}
                </Text>
                {product.brand && (
                    <Text style={[styles.brand, { color: theme.textMuted }]}>{product.brand}</Text>
                )}
                <View style={styles.ratingRow}>
                    <View style={styles.stars}>{renderStars(product.rating)}</View>
                    <Text style={[styles.ratingText, { color: theme.textSecondary }]}>
                        {product.rating?.toFixed(1)}
                    </Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={[styles.price, { color: theme.primary }]}>
                        ${discountPrice || product.price}
                    </Text>
                    {discountPrice && (
                        <Text style={[styles.originalPrice, { color: theme.textMuted }]}>
                            ${product.price}
                        </Text>
                    )}
                    {product.discountPercentage > 0 && (
                        <View style={[styles.discountBadge, { backgroundColor: theme.errorLight }]}>
                            <Text style={[styles.discountText, { color: theme.error }]}>
                                -{Math.round(product.discountPercentage)}%
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 180,
        backgroundColor: '#E2E8F0',
    },
    content: {
        padding: 14,
    },
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    categoryBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    stockBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    stockText: {
        fontSize: 11,
        fontWeight: '600',
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 4,
        lineHeight: 22,
    },
    brand: {
        fontSize: 13,
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 6,
    },
    stars: {
        flexDirection: 'row',
        gap: 2,
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '500',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: '800',
    },
    originalPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
    },
    discountBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    discountText: {
        fontSize: 12,
        fontWeight: '700',
    },
});

export default ProductCard;

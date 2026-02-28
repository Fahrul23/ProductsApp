import React, { useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    useColorScheme,
    StatusBar,
    Image,
    Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getTheme } from '../theme/colors';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

const HomeScreen = () => {
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark);
    const { user, logout } = useAuth();
    const { products, isLoading, isRefreshing, error, refresh, retry } = useProducts();

    const handleProductPress = useCallback(
        (product) => {
            Alert.alert("Info", "Detail Product");
        },
        [],
    );

    const renderProduct = useCallback(
        ({ item }) => (
            <ProductCard product={item} onPress={() => handleProductPress(item)} />
        ),
        [handleProductPress],
    );

    const keyExtractor = useCallback((item) => item.id.toString(), []);

    const renderHeader = () => (
        <View style={[styles.header, { backgroundColor: theme.surface, shadowColor: theme.shadow }]}>
            <View style={styles.headerContent}>
                <View style={styles.userInfo}>
                    {user?.image ? (
                        <Image source={{ uri: user.image }} style={styles.avatar} />
                    ) : (
                        <View style={[styles.avatarPlaceholder, { backgroundColor: theme.primary }]}>
                            <Text style={styles.avatarText}>
                                {user?.firstName?.[0] || 'U'}
                            </Text>
                        </View>
                    )}
                    <View style={styles.userText}>
                        <Text style={[styles.greeting, { color: theme.textSecondary }]}>Selamat datang,</Text>
                        <Text style={[styles.userName, { color: theme.text }]} numberOfLines={1}>
                            {user?.firstName} {user?.lastName}
                        </Text>
                        <Text style={[styles.userEmail, { color: theme.textMuted }]} numberOfLines={1}>
                            {user?.email}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.logoutButton, { backgroundColor: theme.errorLight }]}
                    onPress={logout}
                    activeOpacity={0.8}>
                    <Text style={[styles.logoutText, { color: theme.error }]}>Keluar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderListHeader = () => (
        <View style={styles.listHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>🛍️ Produk Pilihan</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
                {products.length} produk tersedia
            </Text>
        </View>
    );

    if (isLoading) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <StatusBar
                    barStyle={isDark ? 'light-content' : 'dark-content'}
                    backgroundColor={theme.surface}
                />
                {renderHeader()}
                <LoadingState message="Memuat produk..." />
            </View>
        );
    }

    if (error && products.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <StatusBar
                    barStyle={isDark ? 'light-content' : 'dark-content'}
                    backgroundColor={theme.surface}
                />
                {renderHeader()}
                <ErrorState message={error} onRetry={retry} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={theme.surface}
            />
            {renderHeader()}
            <FlatList
                style={styles.flatList}
                data={products}
                renderItem={renderProduct}
                keyExtractor={keyExtractor}
                ListHeaderComponent={renderListHeader}
                ListEmptyComponent={<EmptyState message="Belum ada produk tersedia" icon="🏪" />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                onRefresh={refresh}
                refreshing={isRefreshing}
                initialNumToRender={6}
                maxToRenderPerBatch={8}
                windowSize={5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    flatList: {
        flex: 1,
    },
    header: {
        paddingTop: 12,
        paddingBottom: 16,
        paddingHorizontal: 20,
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    avatarPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    userText: {
        flex: 1,
    },
    greeting: {
        fontSize: 12,
        fontWeight: '500',
    },
    userName: {
        fontSize: 17,
        fontWeight: '700',
        marginTop: 2,
    },
    userEmail: {
        fontSize: 13,
        marginTop: 2,
    },
    logoutButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
    },
    logoutText: {
        fontWeight: '700',
        fontSize: 14,
    },
    listHeader: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 8,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
    },
    sectionSubtitle: {
        fontSize: 14,
        marginTop: 4,
    },
    listContent: {
        paddingBottom: 24,
    },
});

export default HomeScreen;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { getTheme } from '../theme/colors';

const ErrorState = ({ message = 'Terjadi kesalahan', onRetry }) => {
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={styles.icon}>❌</Text>
            <Text style={[styles.title, { color: theme.text }]}>Oops!</Text>
            <Text style={[styles.message, { color: theme.textSecondary }]}>{message}</Text>
            {onRetry && (
                <TouchableOpacity
                    style={[styles.retryButton, { backgroundColor: theme.primary }]}
                    onPress={onRetry}
                    activeOpacity={0.8}>
                    <Text style={styles.retryText}>Coba Lagi</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    icon: {
        fontSize: 48,
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 8,
    },
    message: {
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    retryButton: {
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    retryText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ErrorState;

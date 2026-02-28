import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, useColorScheme } from 'react-native';
import { getTheme } from '../theme/colors';

const LoadingState = ({ message = 'Memuat data...' }) => {
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.message, { color: theme.textSecondary }]}>{message}</Text>
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
    message: {
        marginTop: 16,
        fontSize: 16,
    },
});

export default LoadingState;

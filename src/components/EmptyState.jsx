import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { getTheme } from '../theme/colors';

const EmptyState = ({ message = 'Tidak ada data', icon = '📭' }) => {
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={styles.icon}>{icon}</Text>
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
    icon: {
        fontSize: 56,
        marginBottom: 16,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
});

export default EmptyState;

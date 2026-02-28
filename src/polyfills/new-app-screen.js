import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const NewAppScreen = ({ templateFileName, safeAreaInsets }) => {
    return React.createElement(
        View,
        { style: styles.container },
        React.createElement(Text, { style: styles.title }, 'Welcome to ProductApp'),
        React.createElement(
            Text,
            { style: styles.subtitle },
            `Edit ${templateFileName || 'App.tsx'} to get started`
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
});

export default { NewAppScreen };

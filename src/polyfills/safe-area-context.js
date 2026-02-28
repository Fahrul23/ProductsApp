import React from 'react';

const defaultInsets = { top: 0, right: 0, bottom: 0, left: 0 };

export const SafeAreaProvider = ({ children, ...props }) =>
    React.createElement('div', { ...props, style: { flex: 1, ...props.style } }, children);

export const SafeAreaView = ({ children, ...props }) =>
    React.createElement('div', { ...props, style: { flex: 1, ...props.style } }, children);

export const useSafeAreaInsets = () => defaultInsets;

export const SafeAreaInsetsContext = React.createContext(defaultInsets);

export const initialWindowMetrics = null;

export default {
    SafeAreaProvider,
    SafeAreaView,
    useSafeAreaInsets,
    SafeAreaInsetsContext,
    initialWindowMetrics,
};

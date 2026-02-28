import React from 'react';

export const enableScreens = () => { };
export const enableFreeze = () => { };
export const screensEnabled = () => true;

export const Screen = ({ children, ...props }) =>
    React.createElement('div', props, children);

export const ScreenContainer = ({ children, ...props }) =>
    React.createElement('div', { ...props, style: { flex: 1, ...props.style } }, children);

export const NativeScreen = Screen;
export const NativeScreenContainer = ScreenContainer;
export const ScreenStack = ScreenContainer;
export const ScreenStackHeaderConfig = () => null;

export default {
    enableScreens,
    enableFreeze,
    screensEnabled,
    Screen,
    ScreenContainer,
    NativeScreen,
    NativeScreenContainer,
    ScreenStack,
    ScreenStackHeaderConfig,
};

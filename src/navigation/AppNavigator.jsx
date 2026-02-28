import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { getTheme } from '../theme/colors';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import LoadingState from '../components/LoadingState';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark);
    const { isLoggedIn, isLoading } = useAuth();

    const navigationTheme = {
        ...(isDark ? DarkTheme : DefaultTheme),
        colors: {
            ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
            primary: theme.primary,
            background: theme.background,
            card: theme.surface,
            text: theme.text,
            border: theme.border,
        },
    };

    if (isLoading) {
        return <LoadingState message="Memeriksa sesi..." />;
    }

    return (
        <NavigationContainer theme={navigationTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.surface,
                    },
                    headerTintColor: theme.text,
                    headerTitleStyle: {
                        fontWeight: '700',
                    },
                    headerShadowVisible: false,
                    animation: 'slide_from_right',
                }}>
                {isLoggedIn ? (
                    <>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Detail"
                            component={DetailScreen}
                            options={({ route }) => ({
                                title: route.params?.product?.title || 'Detail Produk',
                                headerBackTitle: 'Kembali',
                            })}
                        />
                    </>
                ) : (
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

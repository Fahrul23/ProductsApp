import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    useColorScheme,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getTheme } from '../theme/colors';

const LoginScreen = () => {
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark);
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!username.trim()) {
            newErrors.username = 'Username tidak boleh kosong';
        }
        if (!password.trim()) {
            newErrors.password = 'Password tidak boleh kosong';
        } else if (password.length < 4) {
            newErrors.password = 'Password minimal 4 karakter';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validate()) return;

        setIsLoading(true);
        setLoginError('');

        try {
            const result = await login(username.trim(), password);
            if (!result.success) {
                setLoginError(result.message);
            }
        } catch (error) {
            setLoginError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: theme.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logo}>🛍️</Text>
                    <Text style={[styles.appName, { color: theme.text }]}>WomApp</Text>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                        Masuk ke akun Anda untuk melanjutkan
                    </Text>
                </View>

                {/* Form Card */}
                <View style={[styles.card, { backgroundColor: theme.surface, shadowColor: theme.shadow }]}>
                    {/* Login Error */}
                    {loginError ? (
                        <View style={[styles.errorBanner, { backgroundColor: theme.errorLight }]}>
                            <Text style={[styles.errorBannerText, { color: theme.error }]}>{loginError}</Text>
                        </View>
                    ) : null}

                    {/* Username Input */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.textSecondary }]}>Username</Text>
                        <View
                            style={[
                                styles.inputContainer,
                                { backgroundColor: theme.inputBg, borderColor: errors.username ? theme.error : theme.border },
                            ]}>
                            <Text style={styles.inputIcon}>👤</Text>
                            <TextInput
                                style={[styles.input, { color: theme.text }]}
                                placeholder="Masukkan username"
                                placeholderTextColor={theme.textMuted}
                                value={username}
                                onChangeText={(text) => {
                                    setUsername(text);
                                    if (errors.username) setErrors((prev) => ({ ...prev, username: '' }));
                                }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!isLoading}
                            />
                        </View>
                        {errors.username ? (
                            <Text style={[styles.errorText, { color: theme.error }]}>{errors.username}</Text>
                        ) : null}
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.textSecondary }]}>Password</Text>
                        <View
                            style={[
                                styles.inputContainer,
                                { backgroundColor: theme.inputBg, borderColor: errors.password ? theme.error : theme.border },
                            ]}>
                            <Text style={styles.inputIcon}>🔒</Text>
                            <TextInput
                                style={[styles.input, { color: theme.text }]}
                                placeholder="Masukkan password"
                                placeholderTextColor={theme.textMuted}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                                }}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                editable={!isLoading}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeButton}>
                                <Text style={{ fontSize: 18 }}>{showPassword ? '🙈' : '👁️'}</Text>
                            </TouchableOpacity>
                        </View>
                        {errors.password ? (
                            <Text style={[styles.errorText, { color: theme.error }]}>{errors.password}</Text>
                        ) : null}
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        style={[
                            styles.loginButton,
                            { backgroundColor: theme.primary },
                            isLoading && { opacity: 0.7 },
                        ]}
                        onPress={handleLogin}
                        disabled={isLoading}
                        activeOpacity={0.85}>
                        {isLoading ? (
                            <ActivityIndicator color="#FFFFFF" size="small" />
                        ) : (
                            <Text style={styles.loginButtonText}>Masuk</Text>
                        )}
                    </TouchableOpacity>

                    {/* Hint */}
                    <View style={[styles.hintBox, { backgroundColor: theme.inputBg }]}>
                        <Text style={[styles.hintTitle, { color: theme.textSecondary }]}>💡 Demo Account</Text>
                        <Text style={[styles.hintText, { color: theme.textMuted }]}>
                            Username: emilys{'\n'}Password: emilyspass
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logo: {
        fontSize: 56,
        marginBottom: 12,
    },
    appName: {
        fontSize: 32,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 22,
    },
    card: {
        borderRadius: 20,
        padding: 24,
        elevation: 5,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    errorBanner: {
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
    },
    errorBannerText: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 18,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1.5,
        paddingHorizontal: 14,
        height: 52,
    },
    inputIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: '100%',
    },
    eyeButton: {
        padding: 4,
    },
    errorText: {
        fontSize: 13,
        marginTop: 6,
        marginLeft: 4,
        fontWeight: '500',
    },
    loginButton: {
        height: 54,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        elevation: 3,
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    hintBox: {
        marginTop: 20,
        padding: 14,
        borderRadius: 12,
    },
    hintTitle: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 6,
    },
    hintText: {
        fontSize: 13,
        lineHeight: 20,
    },
});

export default LoginScreen;

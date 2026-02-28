import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    useColorScheme,
    StatusBar,
    Image,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getTheme } from '../theme/colors';

const HomeScreen = () => {
    const isDark = useColorScheme() === 'dark';
    const theme = getTheme(isDark);
    const { user, logout } = useAuth();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={theme.surface}
            />
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
            <View style={styles.content}>
                <Text style={[styles.welcomeText, { color: theme.text }]}>
                    Anda berhasil Login!
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    welcomeSubText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default HomeScreen;


const AsyncStorage = {
    setItem: async (key, value) => {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.error('AsyncStorage setItem error:', e);
        }
    },
    getItem: async (key) => {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.error('AsyncStorage getItem error:', e);
            return null;
        }
    },
    removeItem: async (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('AsyncStorage removeItem error:', e);
        }
    },
    multiRemove: async (keys) => {
        try {
            keys.forEach((key) => localStorage.removeItem(key));
        } catch (e) {
            console.error('AsyncStorage multiRemove error:', e);
        }
    },
    clear: async () => {
        try {
            localStorage.clear();
        } catch (e) {
            console.error('AsyncStorage clear error:', e);
        }
    },
};

export default AsyncStorage;

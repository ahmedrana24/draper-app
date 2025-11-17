import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../components/Theme';

// Note: This component is currently handling both Login and Register views.

export default function AuthScreen({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleAuthenticate = () => {
        // FR-01: Basic input validation
        if (!email || !password) {
            Alert.alert("Error", "Email and password are required.");
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }
        
        // --- Future Logic ---
        // 1. Call AuthAPI.login(email, password) or AuthAPI.register(email, password) (FR-01)
        // 2. Handle success/error response from backend.

        // Simulating successful authentication for UI testing
        if (isLogin) {
            Alert.alert("Success", "Login Successful. Redirecting to app...");
            onLoginSuccess(); // Trigger navigation to AppNavigator
        } else {
            Alert.alert(
                "Registration Successful", 
                "Account created. You will now set initial preferences (FR-03). Redirecting to login."
            );
            // In a real app, registration would lead to a ProfileSetupScreen (FR-03)
            setIsLogin(true); 
        }
    };

    const handleGoogleAuth = () => {
        // FR-02: Optional Google OAuth integration for faster access
        Alert.alert("Google OAuth", "Integration with Google Auth API pending (FR-02).");
        // Future: Call AuthAPI.signInWithGoogle()
    };

    // Toggle between Login and Register views
    const toggleAuthMode = () => {
        setIsLogin(prev => !prev);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Ionicons name="shirt-outline" size={80} color={theme.colors.primary} style={styles.logoIcon} />
            <Text style={styles.title}>{isLogin ? 'Welcome Back to DRAPER' : 'Join DRAPER - The AI Wardrobe'}</Text>
            <Text style={styles.subtitle}>
                {isLogin ? 'Sign in to access your digital wardrobe' : 'Create your account (FR-01)'}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#A0A0A0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password (Min 8 characters, complex) (FR-01)"
                placeholderTextColor="#A0A0A0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            
            {!isLogin && (
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#A0A0A0"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
            )}

            <View style={styles.buttonContainer}>
                <Button 
                    title={isLogin ? 'Sign In' : 'Register Account'}
                    onPress={handleAuthenticate}
                    color={theme.colors.primary}
                />
            </View>

            <View style={styles.divider}>
                <Text style={styles.dividerText}>OR</Text>
            </View>

            <TouchableOpacity 
                style={styles.googleButton}
                onPress={handleGoogleAuth}
            >
                <Ionicons name="logo-google" size={20} color="#fff" />
                <Text style={styles.googleButtonText}>
                    {isLogin ? 'Sign In with Google (FR-02)' : 'Sign Up with Google (FR-02)'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toggleButton} onPress={toggleAuthMode}>
                <Text style={styles.toggleButtonText}>
                    {isLogin ? "Don't have an account? Register here." : "Already have an account? Sign in."}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.large,
        backgroundColor: theme.colors.background,
    },
    logoIcon: {
        marginBottom: theme.spacing.medium,
    },
    title: {
        fontSize: theme.fontSize.header,
        fontWeight: 'bold',
        marginBottom: theme.spacing.small,
        color: theme.colors.text,
    },
    subtitle: {
        fontSize: theme.fontSize.body,
        marginBottom: theme.spacing.large * 1.5,
        color: 'gray',
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: theme.spacing.medium,
        backgroundColor: theme.colors.card,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
        fontSize: theme.fontSize.body,
        color: theme.colors.text,
    },
    buttonContainer: {
        width: '100%',
        marginTop: theme.spacing.medium,
    },
    divider: {
        marginVertical: theme.spacing.large,
        width: '100%',
        alignItems: 'center',
    },
    dividerText: {
        color: 'gray',
        fontWeight: '600',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 12,
        backgroundColor: '#DB4437', // Google Red
        borderRadius: 8,
        marginBottom: theme.spacing.large,
    },
    googleButtonText: {
        color: '#fff',
        fontSize: theme.fontSize.body,
        fontWeight: 'bold',
        marginLeft: theme.spacing.small,
    },
    toggleButton: {
        padding: theme.spacing.small,
    },
    toggleButtonText: {
        color: theme.colors.primary,
        fontSize: theme.fontSize.body,
        textDecorationLine: 'underline',
    },
});
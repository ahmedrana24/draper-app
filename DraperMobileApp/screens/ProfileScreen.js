import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { theme } from '../components/Theme';

export default function ProfileScreen({ route }) {
    // Note: We access the mock login function from App.js via props or context in the final version.
    // For now, we simulate the action.
    const mockLogout = () => {
        // NFR-08: This will handle secure session termination.
        alert('Logging out user...');
        // Future: Call route.params.onLogout or AuthContext.logout()
    };

    const handleUpdateProfile = () => {
        // FR-04: User updates personal details and style preferences.
        alert('Profile update form opened (FR-04).');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>User Profile & Settings</Text>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Account Details</Text>
                <Text style={styles.detailText}>Email: user@example.com (Placeholder)</Text>
                <Text style={styles.detailText}>Role: End-User (FR-15)</Text>
                <Button 
                    title="Update Profile & Preferences (FR-04)" 
                    onPress={handleUpdateProfile}
                    color={theme.colors.secondary} 
                />
            </View>
            
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>App Controls</Text>
                {/* Future: Notifications toggle (FR-33) goes here */}
                {/* Future: Compatibility checks (NFR-11, NFR-12) can be displayed */}
                <Text style={styles.settingText}>Compatibility: Android 10.0+ (NFR-11)</Text>
            </View>

            <View style={styles.logoutButtonContainer}>
                <Button 
                    title="Log Out" 
                    onPress={mockLogout} 
                    color={theme.colors.error}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.medium },
    title: { fontSize: theme.fontSize.header, fontWeight: 'bold', marginBottom: theme.spacing.large, color: theme.colors.text },
    card: {
        backgroundColor: theme.colors.card,
        padding: theme.spacing.medium,
        marginBottom: theme.spacing.medium,
        borderRadius: 8,
        elevation: 2,
    },
    sectionTitle: { fontSize: theme.fontSize.title, fontWeight: '600', marginBottom: theme.spacing.small, color: theme.colors.primary },
    detailText: { fontSize: theme.fontSize.body, marginBottom: theme.spacing.small, color: theme.colors.text },
    settingText: { fontSize: theme.fontSize.body, marginBottom: theme.spacing.small, color: theme.colors.text },
    logoutButtonContainer: {
        marginTop: theme.spacing.large,
    },
});
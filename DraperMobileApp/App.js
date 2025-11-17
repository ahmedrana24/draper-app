import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator'; // Main tabs for logged-in users
import AuthNavigator from './navigation/AuthNavigator'; // Login/Register stack
import { theme } from './components/Theme'; // Import the essential theme object

// --- Custom Hook to Simulate Auth Status (NFR-08) ---
function useAuthStatus() {
  const [isLoading, setIsLoading] = useState(true);
  // Setting this to false forces the app to the AuthNavigator first (Login screen)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userId, setUserId] = useState(null); // Placeholder for future Firebase UID

  useEffect(() => {
    // Phase 1 MVP: Simulate loading and session check
    setTimeout(() => {
      setIsLoading(false);
      // To test the main tabs, set setIsLoggedIn(true) here:
      // setIsLoggedIn(true); 
    }, 1500); 
  }, []);

  return { isLoading, isLoggedIn, setIsLoggedIn, userId };
}

// --- Main Application Component ---
export default function App() {
  const { isLoading, isLoggedIn, setIsLoggedIn } = useAuthStatus();

  if (isLoading) {
    // NFR-03 & NFR-02: Show clear visual feedback during loading
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    // We remove the 'independent={true}' prop to resolve the final conflict
    <NavigationContainer> 
      {/* Conditional rendering based on login status (FR-01) */}
      {isLoggedIn ? (
        // Renders the Home/Wardrobe/Moodboards tabs
        <AppNavigator /> 
      ) : (
        // Renders the Login/Register stack, passing the success function
        <AuthNavigator onLoginSuccess={() => setIsLoggedIn(true)} /> 
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
});
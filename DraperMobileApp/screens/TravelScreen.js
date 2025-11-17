import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { theme } from '../components/Theme';

export default function TravelScreen() {
    const [destination, setDestination] = useState('');
    const [dates, setDates] = useState('');

    const handlePlanTrip = () => {
        // FR-21: Validate input and send data to the backend for weather retrieval
        if (!destination || !dates) {
            alert("Please enter destination and dates.");
            return;
        }
        
        // Simulating the start of the planning process (FR-22, FR-23)
        alert(`Starting trip plan for ${destination} on ${dates}. Weather API integration pending...`);
        // Future: Navigation to the generated packing list view
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Smart Packing Assistant 🧳</Text>
            <Text style={styles.description}>
                Let Draper help you plan your travel capsule wardrobe based on your destination's weather (FR-21).
            </Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Destination City</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., London, Karachi, New York"
                    value={destination}
                    onChangeText={setDestination}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Travel Dates</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., Dec 10 - Dec 15"
                    value={dates}
                    onChangeText={setDates}
                />
            </View>
            
            <View style={styles.buttonContainer}>
                <Button 
                    title="Plan Travel Capsule" 
                    onPress={handlePlanTrip} 
                    color={theme.colors.primary} 
                />
            </View>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.medium },
    title: { fontSize: theme.fontSize.title, fontWeight: 'bold', marginBottom: theme.spacing.small, color: theme.colors.text },
    description: { fontSize: theme.fontSize.body, marginBottom: theme.spacing.large, color: theme.colors.text },
    inputGroup: { marginBottom: theme.spacing.medium },
    label: { fontSize: theme.fontSize.body, fontWeight: '500', marginBottom: 4, color: theme.colors.text },
    input: {
        backgroundColor: theme.colors.card,
        padding: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: theme.colors.border,
        fontSize: theme.fontSize.body,
    },
    buttonContainer: {
        marginTop: theme.spacing.medium,
    },
});
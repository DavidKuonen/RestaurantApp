import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState} from 'react';

export default function RestaurantScreen({ navigation }) {

    //const{ restaurant } = route.params;
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello screen</Text>
            <Button
                title="Home"
                onPress={() => navigation.navigate('Home')} // Navigate to Home screen
            />
        </View>
    );
}
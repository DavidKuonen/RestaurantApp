import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function RestaurantScreen({ route, navigation }) {

    const { restName, restAddress, menu } = route.params;

    const {restaurantName, setRestaurantName} = useState(JSON.stringify(restName));
    const {restaurantAddress, setRestaurantAddress} = useState(JSON.stringify(restAddress));
    const {restaurantMenu, setRestauranMenu} = useState([]);


    const key = "C0r8kKdwsm6ea23nPoIQ4FIeVqvWSlZX";

    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    });
    const [marker, setMarker] = useState({
        latitude: 60.201373,
        longitude: 24.934041
    });

    const [input, setInput] = useState("Mall of Tripla, Helsinki");

    const fetchLocation = () => {
        fetch('https://www.mapquestapi.com/geocoding/v1/address?key=' + key + '&location=' + input)
            .then(response => response.json())
            .then(data => {
                location = data.results[0].locations[0]

                setRegion({
                    latitude: location.latLng.lat,
                    longitude: location.latLng.lng,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221
                });

                setMarker({
                    latitude: location.latLng.lat,
                    longitude: location.latLng.lng,
                })
            })
            .catch(error => {
                Alert.alert('Error', error);
            });
    }

    useEffect(() => {
        //Change to the Address of chosen Restaurant from previous screen with help of param      
        setInput(JSON.stringify(restAddress));
        fetchLocation();
    })
        ;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MapView
                style={{ flex: 1, height: '50%', width: '100%' }}
                region={region}>
                <Marker
                    coordinate={marker}
                    title={JSON.stringify(restName)} />
            </MapView>
            <TextInput
                placeholderTextColor='grey'
                placeholder='Location'
                onChangeText={text => setInput(text)}
            />
            <Text> Blabla , {JSON.stringify(restAddress)}</Text>

            <View>

                <Button
                    title="Home"
                    onPress={() => navigation.navigate('Home')} // Navigate to Home screen
                />

            </View>

        </View>
    );
}
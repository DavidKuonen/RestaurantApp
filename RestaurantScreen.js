import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ListItem } from 'react-native-elements';

export default function RestaurantScreen({ route, navigation }) {

    const { restaurant } = route.params;
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

    const [input, setInput] = useState('');

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
        setInput(JSON.stringify(restaurant.restaurantAddress));
        fetchLocation();

    });

    const renderItem = ({ item }) => (
        <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.price}0 Euro </ListItem.Subtitle>
        </ListItem.Content>
    );

    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MapView
                style={{ flex: 1, height: '50%', width: '100%' }}
                region={region}>
                <Marker
                    coordinate={marker}
                    title={restaurant.restaurantName} />
            </MapView>

            <Text style={styles.text}> Menu from {restaurant.restaurantName}</Text>
            <FlatList style={styles.list}
                data={restaurant.menu}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    text: {
        paddingTop: 50,
        fontWeight: 'bold',
        fontSize: 20
    },
    list: {
        paddingTop: 10
    }
});

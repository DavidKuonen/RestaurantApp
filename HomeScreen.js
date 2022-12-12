import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBeOOEdabk5jsDIMv-mprLtBK1Rlg70Kbw",
    authDomain: "restaurantappdavidkuonen.firebaseapp.com",
    databaseURL: "https://restaurantappdavidkuonen-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "restaurantappdavidkuonen",
    storageBucket: "restaurantappdavidkuonen.appspot.com",
    messagingSenderId: "26895683017",
    appId: "1:26895683017:web:b84495461a1ac7fb456c18"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function writeRestaurantData(restaurantId, name, address) {
    const reference = ref(database, 'restaurants/' + restaurantId);

    set(reference, {
        restaurantName: name,
        restaurantAddress: address,
        menu: {
            0: {
                name: 'Chicken Burger',
                price: 4.90

            },
            1: {
                name: 'Cheese Burger',
                price: 3.60
            },
            2: {
                name: 'Vegan Burger',
                price: 4.80
            }
        }
    });
}



export default function HomeScreen({ navigation }) {

    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');
    const [restaurantMenu, setRestaurantMenu] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        const itemsRef = ref(database, 'restaurants/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setRestaurants(Object.values(data));
                setKeys(Object.keys(data));
            }
            else {
                setRestaurants([]);
            }
        })

    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <FlatList
                data={restaurants}

                renderItem={({ item}) => (

                    <View>
                        <Text>{item.restaurantName}, {item.restaurantAddress} </Text>
                        <Button
                            //How to pass parameter example:
                            //<Button title='History' onPress={() => navigation.navigate('History', {param: results})}></Button>
                            title="Choose" onPress={() => navigation.navigate('Restaurant', { restName: item.restaurantName,
                            restAddress: item.restaurantAddress })}> </Button>
                        <Text>{item.menu[0].name}, {item.menu[0].price} Euro</Text>
                        <Text>{item.menu[1].name}, {item.menu[1].price} Euro</Text>
                        <Text>{item.menu[2].name}, {item.menu[2].price} Euro</Text>
                        <Text>-----------------------------------------</Text>
                        

                    </View>

                )}

            />


        </View>
    );
}
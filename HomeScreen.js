import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState} from 'react';
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
  
  function writeRestaurantData(restaurantId, name, address){
    const reference = ref(database,'restaurants/'+restaurantId);

    set(reference,{
        restaurantName : name,
        restaurantAddress : address
    });
  }

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello screen</Text>
            
            <Button
                title="Restaurant"
                onPress={() => navigation.navigate('Restaurant')} // Navigate to Restaurant screen
                //How to pass parameter example:
                //<Button title='History' onPress={() => navigation.navigate('History', {param: results})}></Button>
            />
            <Button
                title="Upload"
                onPress={writeRestaurantData("2","Fafa","Mall of Tripla")} // Navigate to Restaurant screen
                //How to pass parameter example:
                //<Button title='History' onPress={() => navigation.navigate('History', {param: results})}></Button>
            />

        </View>
    );
}
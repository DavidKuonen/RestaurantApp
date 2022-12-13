import { StyleSheet, Image, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, set } from 'firebase/database';
import { Icon, Button } from 'react-native-elements';
import { ListItem } from 'react-native-elements';

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

export default function HomeScreen({ navigation }) {

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const itemsRef = ref(database, 'restaurants/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setRestaurants(Object.values(data));
            }
            else {
                setRestaurants([]);
            }
        })

    }, []);

    const renderItem = ({ item }) => (
        <ListItem.Swipeable
            rightContent={
                <Button raised icon={{ name: 'shopping-basket', color: '#CCBA78' }}
                    title="Menu"
                    titleStyle={{color:'#CCBA78'}}
                    buttonStyle={{ minHeight: '100%', backgroundColor: '#525C60' }}
                    onPress={() => navigation.navigate('Restaurant', {
                        restaurant: item
                    })}> </Button>
            }>
            <ListItem.Content>
                <ListItem.Title>{item.restaurantName}</ListItem.Title>
                <ListItem.Subtitle>{item.restaurantAddress}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem.Swipeable>
    );

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={styles.logo} source={require("./assets/logo.png")} />
            <FlatList style={styles.list}
                data={restaurants}
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
    logo: {
        height: 350
    },
    list: {
        width: '100%',
        marginTop: 20,
    }
});

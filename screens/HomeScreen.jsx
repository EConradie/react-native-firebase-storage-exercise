import { Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { getmyBucketListImages } from '../services/dbService';

const HomeScreen = ({ navigation }) => {

    const [images, setImages] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            handleGetImages();

            return () => { };
        }, [])
    );

    const handleGetImages = async () => {
        const data = await getmyBucketListImages();
        setImages(data);
    };

    return (
        <ScrollView style={styles.container}>
            <Pressable onPress={() => navigation.navigate("Add")}>
                <Text>Add</Text>
            </Pressable>


            {images.length > 0 ? images.map((image, index) => (
                <View style={styles.card} key={index}>
                    <Image
                        style={styles.img}
                        source={{
                            uri: image.uri,
                        }} />
                    <Text>{image.name}</Text>
                </View>
            )) : <Text>No images</Text>}


        </ScrollView>

    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20
    },
    img: {
        width: '100%',
        height: 200,
        objectFit: 'cover'
    }
})
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { handleUploadOfImage } from '../services/BucketService';

const AddScreen = ({ navigation }) => {

    const [title, setTitle] = useState('')

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    //Calling our service function to upload the image
    const uploadImage = async () => {

        success = await handleUploadOfImage(image, title);

        if (success) {
            alert('Image Uploaded Successfully')
            navigation.goBack()
        }
    }

    return (

        <View style={styles.container}>

            <TextInput
                style={styles.inputField}
                placeholder="Memory Title"
                onChangeText={newText => setTitle(newText)}
                defaultValue={title}
            />

            {/* TODO: Upload Image */}
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}

            <TouchableOpacity style={styles.button} onPress={uploadImage} >
                <Text style={styles.buttonText}>Add Memory</Text>
            </TouchableOpacity>

        </View>
    )
}

export default AddScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    inputField: {
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 15,
        padding: 10
    },
    button: {
        backgroundColor: "green",
        textAlign: 'center',
        padding: 15,
        marginTop: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
    image: {
        width: 200,
        height: 200,
    },
})
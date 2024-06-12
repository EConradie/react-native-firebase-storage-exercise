// TODO: Upload Image to Buckets

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { createNewBucketImage } from "./dbService";

export const handleUploadOfImage = async (uri, fileName) => {
    try {
        console.log("uploading image")
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            }
            xhr.onerror = function () {
                console.log(e);
                reject(new TypeError('Network request failed'));
            }
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        })

        const uploadRef = ref(storage, fileName)
        const uploadResult = await uploadBytes(uploadRef, blob)

        blob.close()

        console.log(await getDownloadURL(uploadRef))

        createNewBucketImage(fileName, await getDownloadURL(uploadRef))

        return true; 
    } catch (error) {
        console.error("Error uploading image:", error);
        return false;
    }
}
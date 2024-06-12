import {
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
    where,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import { db } from "../firebase";
  
  export const createNewBucketImage = async (fileName, imageUri) => {

    const image = {
      name: fileName,
      uri: imageUri,
    };

    try {
      const docRef = await addDoc(collection(db, "images"), image);
      console.log("Document written with ID: ", docRef.id);
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  };

  export const getmyBucketListImages = async () => {
    var allImages = [];
  
    var q = query(collection(db, "images"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      allImages.push({ ...doc.data(), id: doc.id });
    });
  
    return allImages;
  };
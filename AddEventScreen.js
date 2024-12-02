// import React, { useState } from "react";
// import { View, TextInput, Button, StyleSheet } from "react-native";
// import { collection, addDoc } from "firebase/firestore";
// import { db, auth } from "./firebaseConfig";

// const AddEventScreen = ({ navigation }) => {
//   const [eventName, setEventName] = useState("");
//   const [eventDescription, setEventDescription] = useState("");
//   const userId = auth.currentUser?.uid;

//   const postEvent = async () => {
//     if (!eventName.trim() || !eventDescription.trim()) {
//       return alert("Both fields are required!");
//     }

//     const newEvent = { name: eventName, description: eventDescription, userId, isFavorite: false };
//     await addDoc(collection(db, "tasks"), newEvent);
//     navigation.goBack();
//   };


//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Event Name"
//         value={eventName}
//         onChangeText={setEventName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Event Description"
//         value={eventDescription}
//         onChangeText={setEventDescription}
//       />
//       <Button title="Post Event" onPress={postEvent} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   input: { borderWidth: 1, padding: 8, marginVertical: 10 },
// });

// export default AddEventScreen;


import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";  // Ensure firebaseConfig is correctly imported

const AddEventScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const userId = auth.currentUser?.uid;  // Get the current user's ID

  // Check if user is authenticated
  if (!userId) {
    Alert.alert("Not Authenticated", "You need to log in first.");
    navigation.replace("SignIn"); // Redirect to SignIn screen if not authenticated
    return null;
  }

  // Post event to Firestore
  const postEvent = async () => {
    if (!eventName.trim() || !eventDescription.trim()) {
      return alert("Both fields are required!");
    }

    const newEvent = { 
      name: eventName, 
      description: eventDescription, 
      userId, 
      isFavorite: false 
    };

    try {
      await addDoc(collection(db, "tasks"), newEvent);
      console.log("Event posted successfully:", newEvent);
      Alert.alert("Success", "Event posted successfully!");
      navigation.goBack();  // Go back to the previous screen after posting
    } catch (error) {
      console.error("Error posting event:", error.message);
      Alert.alert("Error", "Failed to post event. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Description"
        value={eventDescription}
        onChangeText={setEventDescription}
      />
      <Button title="Post Event" onPress={postEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 },
});

export default AddEventScreen;

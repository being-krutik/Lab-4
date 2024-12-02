import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const EditEventScreen = ({ route, navigation }) => {
  const { event } = route.params;
  const [eventName, setEventName] = useState(event.name);
  const [eventDescription, setEventDescription] = useState(event.description);

  const updateEvent = async () => {
    const eventRef = doc(db, "tasks", event.id);
    await updateDoc(eventRef, {
      name: eventName,
      description: eventDescription,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
        placeholder="Event Name"
      />
      <TextInput
        style={styles.input}
        value={eventDescription}
        onChangeText={setEventDescription}
        placeholder="Event Description"
      />
      <Button title="Update Event" onPress={updateEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 },
});

export default EditEventScreen;

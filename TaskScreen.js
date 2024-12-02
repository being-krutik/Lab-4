import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from "react-native";
import { collection, getDocs, doc, deleteDoc, updateDoc, query, where, onSnapshot } from "firebase/firestore";  // Import onSnapshot
import { db, auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";  // Import signOut from Firebase

const TaskScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return; // Don't fetch tasks if the user is not logged in

    const q = query(collection(db, "tasks"), where("userId", "==", userId));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [userId]);

  // Fetch tasks
  const fetchTasks = async () => {
    const q = query(collection(db, "tasks"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const tasksData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(tasksData);
  };

  // Edit a task
  const editTask = async (id, updatedName) => {
    await updateDoc(doc(db, "tasks", id), { name: updatedName });
    fetchTasks();
  };

  // Delete a task
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    fetchTasks();
  };

  // Toggle favorite
  const toggleFavorite = async (id, currentState) => {
    await updateDoc(doc(db, "tasks", id), { isFavorite: !currentState });
    fetchTasks();
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);  // Sign out the user
      // Reset the navigation stack to the SignIn screen
      navigation.reset({
        index: 0,
        routes: [{ name: "SignIn" }],
      });
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddEvent")}
      >
        <Text style={styles.buttonText}>Add Event</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FavoriteEvents")}
      >
        <Text style={styles.buttonText}>View Favorite Events</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}  // Call handleLogout when pressed
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your Events</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <View style={styles.buttons}>
              <Button
                title="Edit"
                onPress={() =>
                  navigation.navigate("EditEvent", {
                    event: item, // Pass the event data to EditEventScreen
                  })
                }
              />
              <Button title="Delete" onPress={() => deleteTask(item.id)} />
              <Button
                title={item.isFavorite ? "Unfavorite" : "Favorite"}
                onPress={() => toggleFavorite(item.id, item.isFavorite)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  taskCard: { padding: 15, borderWidth: 1, marginVertical: 5 },
  buttons: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 },
  button: { backgroundColor: "blue", padding: 10, marginVertical: 10 },
  buttonText: { color: "white", textAlign: "center" },
});

export default TaskScreen;

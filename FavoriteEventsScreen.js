import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";

const FavoriteEventsScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const userId = auth.currentUser?.uid;

  // Fetch favorite events
  const fetchFavorites = async () => {
    const q = query(collection(db, "tasks"), where("isFavorite", "==", true), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const favoritesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFavorites(favoritesData);
  };

  // Remove from favorites
  const toggleFavorite = async (id) => {
    await updateDoc(doc(db, "tasks", id), { isFavorite: false });
    fetchFavorites();
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Events</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Button title="Remove Favorite" onPress={() => toggleFavorite(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  taskCard: { padding: 15, borderWidth: 1, marginVertical: 5 },
});

export default FavoriteEventsScreen;

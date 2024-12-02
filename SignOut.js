import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { auth } from "./firebaseConfig";

const SignOut = ({ navigation }) => {
  const handleSignOut = () => {
    auth.signOut().then(() => navigation.replace("SignIn"));
  };

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default SignOut;

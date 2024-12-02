import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { loginUser } from "./Authentication";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const { user, error } = await loginUser(email, password);
    if (user) {
      navigation.replace("Home");
    } else {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Text onPress={() => navigation.navigate("SignUp")}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});

export default SignInScreen;

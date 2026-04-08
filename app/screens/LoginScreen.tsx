import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { login } from "../core/utils/authService";

export default function LoginScreen({ navigation }: any) {
  const [trainerName, setTrainerName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const success = await login(trainerName, password);
    

    if (success) {
      router.replace("/");
    } else {
      setError("Identifiants invalides");
    }
  };

  return (
    <View>
      <TextInput placeholder="TrainerName" onChangeText={setTrainerName} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      
      {error ? <Text>{error}</Text> : null}

      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
}
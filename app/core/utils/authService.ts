import AsyncStorage from "@react-native-async-storage/async-storage";

const TRAINER_KEY = "@trainer";

type Trainer = {
  trainerName: string;
};

export async function login(trainerName: string, password: string): Promise<boolean> {
  
  if (trainerName === "admin" && password === "1234") {
    const trainer: Trainer = { trainerName };

    await AsyncStorage.setItem(TRAINER_KEY, JSON.stringify(trainer));
    return true;
  }

  return false;
}

export async function logout(): Promise<void> {
  await AsyncStorage.removeItem(TRAINER_KEY);
}

export async function getTrainer(): Promise<Trainer | null> {
  const data = await AsyncStorage.getItem(TRAINER_KEY);
  return data ? JSON.parse(data) : null;
}

export async function isAuthenticated(): Promise<boolean> {
  const trainer = await getTrainer();
  return !!trainer;
}
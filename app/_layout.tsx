import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'PokeMemo' }} />
      <Stack.Screen name="details" options={{ title: 'Détails' }} />
      <Stack.Screen name="login" options={{ title: 'Connexion' }} />
    </Stack>
  );
}

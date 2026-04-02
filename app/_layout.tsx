import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="HomeScreen" options={{ title: 'HomeScreen' }} />
    </Stack>
  );
}

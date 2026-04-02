import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity } from 'react-native';

export default function DetailsScreen() {
    const router = useRouter();
    const { name, image, types, abilities } = useLocalSearchParams<{
        name: string;
        image: string;
        types: string;
        abilities: string;
    }>();

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>⬅ Retour</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 10 }}>{name}</Text>

            <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />

            <Text style={{ marginTop: 10 }}>Types :</Text>
            {types?.split(',').map((type) => (
                <Text key={type}>- {type}</Text>
            ))}

            <Text style={{ marginTop: 10 }}>Capacités :</Text>
            {abilities?.split(',').map((ability) => (
                <Text key={ability}>- {ability}</Text>
            ))}
        </ScrollView>
    );
}


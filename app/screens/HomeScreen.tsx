import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const examplePokemon = {
    id: 1,
    name: 'Pikachu',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    types: ['Electric'],
    abilities: ['Static', 'Lightning Rod'],
};

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <TouchableOpacity
                onPress={() =>
                    router.push({
                        pathname: '/details' as never,
                        params: {
                            name: examplePokemon.name,
                            image: examplePokemon.image,
                            types: examplePokemon.types.join(','),
                            abilities: examplePokemon.abilities.join(','),
                        },
                    })
                }
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: 20,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    width: 200,
                }}
            >
                <Image
                    source={{ uri: examplePokemon.image }}
                    style={{ width: 150, height: 150, marginBottom: 15 }}
                />
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                    {examplePokemon.name}
                </Text>
                <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {examplePokemon.types.map((type) => (
                        <Text
                            key={type}
                            style={{
                                fontSize: 12,
                                backgroundColor: '#e0e0e0',
                                paddingHorizontal: 10,
                                paddingVertical: 4,
                                borderRadius: 8,
                            }}
                        >
                            {type}
                        </Text>
                    ))}
                </View>
            </TouchableOpacity>
        </View>
    );
}



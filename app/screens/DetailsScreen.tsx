import { Image, ScrollView, Text, TouchableOpacity } from 'react-native';

type Props = {
    pokemon: any;
    onClose: () => void;
};

export default function DetailsScreen({ pokemon, onClose }: Props) {
    return (
        <ScrollView>

            <TouchableOpacity onPress={onClose}>
                <Text>⬅ Retour</Text>
            </TouchableOpacity>

            <Text>{pokemon.name}</Text>

            <Image
                source={{ uri: pokemon.image }}
                style={{ width: 150, height: 150 }}
            />

            <Text>Types :</Text>
            {pokemon.types.map((type: string) => (
                <Text key={type}>- {type}</Text>
            ))}

            <Text>Capacités :</Text>
            {pokemon.abilities.map((ability: string) => (
                <Text key={ability}>- {ability}</Text>
            ))}

        </ScrollView>
    );
}
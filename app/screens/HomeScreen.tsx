import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { usePokemonDetails } from "./presentation/hooks/usePokemonDetails";

export default function HomeScreen() {
  const { pokemon, loading, error } = usePokemonDetails(8);
  const router = useRouter();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{error}</Text>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Aucun Pokémon trouvé</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/details" as never,
            params: {
              name: pokemon.name,
              image: pokemon.imageUrl,
              types: pokemon.types.join(","),
              abilities: pokemon.abilities.join(","),
            },
          })
        }
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 20,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          width: 200,
        }}
      >
        <Image
          source={{ uri: pokemon.imageUrl }}
          style={{ width: 150, height: 150, marginBottom: 15 }}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          {pokemon.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {pokemon.types.map((type: string) => (
            <Text
              key={type}
              style={{
                fontSize: 12,
                backgroundColor: "#e0e0e0",
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

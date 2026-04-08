import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { isAuthenticated, logout } from "../core/utils/authService";
import { useRandomPokemons } from "./presentation/hooks/useRandomPokemons";


const TYPE_COLORS: Record<string, string> = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
};

export default function HomeScreen() {
  const { pokemons, loading, error } = useRandomPokemons();
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const trainer = await isAuthenticated();
      setIsLogged(trainer);
    };
    checkAuth();
  },[]);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#E3350D" />
        <Text style={styles.loadingText}>Chargement des Pokémon...</Text>
        <Button title="Se déconnecter" onPress={handleLogout} color="#E3350D" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        
          <Text style={styles.headerSubtitle}>Choisis ton Pokémon</Text>
        <View style={styles.headerTopRow}>
          <Text style={styles.headerTitle}>🎮 PokéMemo</Text>
          <TouchableOpacity
            onPress={async () => {
              if (isLogged) {
                await logout();
                setIsLogged(false);
              } else {
                router.push("/login");
              }
            }}
            style={styles.authButton}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={isLogged ? "logout" : "login"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={pokemons}
        keyExtractor={(item) => String(item.id)}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item: pokemon }) => {
          const mainType = pokemon.types[0] ?? "normal";
          const cardColor = TYPE_COLORS[mainType] ?? "#A8A878";

          return (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() =>
                router.push({
                  pathname: "/details" as never,
                  params: {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.imageUrl,
                    types: pokemon.types.join(","),
                    abilities: pokemon.abilities.join(","),
                    height: pokemon.height,
                    weight: pokemon.weight,
                    stats: JSON.stringify(pokemon.stats),
                  },
                })
              }
              style={[styles.card, { backgroundColor: cardColor }]}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardInfo}>
                  <Text style={styles.pokemonId}>
                    #{String(pokemon.id).padStart(3, "0")}
                  </Text>
                  <Text style={styles.pokemonName}>
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </Text>
                  <View style={styles.typesRow}>
                    {pokemon.types.map((type: string) => (
                      <View key={type} style={styles.typeBadge}>
                        <Text style={styles.typeText}>{type}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <Image
                  source={{ uri: pokemon.imageUrl }}
                  style={styles.pokemonImage}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const SCREEN_HEIGHT = Dimensions.get("window").height;
const AVAILABLE_HEIGHT = SCREEN_HEIGHT - 90 - 50 - 34;
const CARD_HEIGHT = Math.floor((AVAILABLE_HEIGHT - 8 * 4) / 5);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    color: "#E3350D",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#E3350D",
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  scrollContent: {
    padding: 16,
    gap: 14,
    paddingBottom: 30,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 8,
  },
  card: {
    borderRadius: 20,
    height: CARD_HEIGHT,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 0,
  },
  cardInfo: {
    flex: 1,
  },
  pokemonId: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
    marginBottom: 2,
  },
  pokemonName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  typesRow: {
    flexDirection: "row",
    gap: 6,
  },
  typeBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  typeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  pokemonImage: {
    width: CARD_HEIGHT * 0.9,
    height: CARD_HEIGHT * 0.9,
    marginRight: -8,
  },
  headerTopRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

authButton: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: "rgba(255,255,255,0.25)",
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 4,
  borderWidth: 2,
  borderColor: "rgba(255,255,255,0.4)",
},

authButtonText: {
  color: "#fff",
  fontWeight: "600",
  fontSize: 12,
},
});

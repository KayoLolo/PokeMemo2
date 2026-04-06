import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const STAT_LABELS: Record<string, string> = {
  hp: "PV",
  attack: "Attaque",
  defense: "Défense",
  "special-attack": "Att. Spé.",
  "special-defense": "Déf. Spé.",
  speed: "Vitesse",
};

const STAT_COLORS: Record<string, string> = {
  hp: "#FF5959",
  attack: "#F5AC78",
  defense: "#FAE078",
  "special-attack": "#9DB7F5",
  "special-defense": "#A7DB8D",
  speed: "#FA92B2",
};

export default function DetailsScreen() {
  const router = useRouter();
  const { name, image, types, abilities, height, weight, stats } =
    useLocalSearchParams<{
      name: string;
      image: string;
      types: string;
      abilities: string;
      height: string;
      weight: string;
      stats: string;
    }>();

  const typeList = types?.split(",") ?? [];
  const abilityList = abilities?.split(",") ?? [];
  const statsObj: Record<string, number> = stats ? JSON.parse(stats) : {};
  const mainType = typeList[0] ?? "normal";
  const headerColor = TYPE_COLORS[mainType] ?? "#A8A878";

  const heightM = height ? (Number.parseInt(height, 10) / 10).toFixed(1) : "?";
  const weightKg = weight ? (Number.parseInt(weight, 10) / 10).toFixed(1) : "?";

  const maxStat = Math.max(...Object.values(statsObj), 1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header coloré */}
        <View style={[styles.header, { backgroundColor: headerColor }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pokemonName}>
            {name
              ? name.charAt(0).toUpperCase() + name.slice(1)
              : "Pokémon"}
          </Text>
          <View style={styles.typesRow}>
            {typeList.map((type) => (
              <View key={type} style={styles.typeBadge}>
                <Text style={styles.typeText}>{type}</Text>
              </View>
            ))}
          </View>
          <Image source={{ uri: image }} style={styles.pokemonImage} />
        </View>

        <View style={styles.body}>
          {/* Taille & Poids */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Informations</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoValue}>{heightM} m</Text>
                <Text style={styles.infoLabel}>Taille</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoItem}>
                <Text style={styles.infoValue}>{weightKg} kg</Text>
                <Text style={styles.infoLabel}>Poids</Text>
              </View>
            </View>
          </View>

          {/* Capacités */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Capacités</Text>
            <View style={styles.abilitiesRow}>
              {abilityList.map((ability) => (
                <View
                  key={ability}
                  style={[styles.abilityBadge, { borderColor: headerColor }]}
                >
                  <Text style={[styles.abilityText, { color: headerColor }]}>
                    {ability.charAt(0).toUpperCase() + ability.slice(1)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Statistiques */}
          {Object.keys(statsObj).length > 0 && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Statistiques de base</Text>
              {Object.entries(statsObj).map(([statName, value]) => (
                <View key={statName} style={styles.statRow}>
                  <Text style={styles.statLabel}>
                    {STAT_LABELS[statName] ?? statName}
                  </Text>
                  <Text style={styles.statValue}>{value}</Text>
                  <View style={styles.statBarBg}>
                    <View
                      style={[
                        styles.statBarFill,
                        {
                          width: `${Math.round((value / maxStat) * 100)}%`,
                          backgroundColor: STAT_COLORS[statName] ?? headerColor,
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 90,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: "flex-start",
    position: "relative",
  },
  backButton: {
    marginBottom: 8,
  },
  backArrow: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  pokemonName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  typesRow: {
    flexDirection: "row",
    gap: 8,
  },
  typeBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  typeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  pokemonImage: {
    width: 160,
    height: 160,
    position: "absolute",
    right: 16,
    bottom: -50,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 30,
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  infoItem: {
    alignItems: "center",
    flex: 1,
  },
  infoDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E0E0E0",
  },
  infoValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  infoLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  abilitiesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  abilityBadge: {
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  abilityText: {
    fontSize: 13,
    fontWeight: "600",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  statLabel: {
    width: 80,
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  statValue: {
    width: 32,
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
  },
  statBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  statBarFill: {
    height: "100%",
    borderRadius: 4,
  },
});

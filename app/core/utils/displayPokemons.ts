import AsyncStorage from "@react-native-async-storage/async-storage";

const DISPLAYED_POKEMONS_KEY = "@pokemon_displayed_ids";

export async function getDisplayedPokemonIds() {
    try{
        const storedIds = await AsyncStorage.getItem('@pokemon_displayed_ids');
        return storedIds ? JSON.parse(storedIds) : [];
    }catch (err) {
        console.error("Erreur durant la récupération", err);
        return [];
    }
}

export async function notePokemonAsDisplayed(ids: number[]) {
    try {
        const curentIds = await getDisplayedPokemonIds();
        const newIds = [...curentIds, ...ids];
        await AsyncStorage.setItem('@pokemon_displayed_ids', JSON.stringify(newIds));
    }catch (err) {
        console.error("Erreur durant la sauvegarde", err);
    }
}
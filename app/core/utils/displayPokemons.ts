import AsyncStorage from "@react-native-async-storage/async-storage";

const DISPLAYED_POKEMONS_KEY = "@pokemon_displayed_ids";
const TIMESTAMP_KEY = "@pokemon_timestamp";

export async function getDisplayedPokemonIds() {
    try{
        const storedIds = await AsyncStorage.getItem(DISPLAYED_POKEMONS_KEY);
        const timeStamp = await AsyncStorage.getItem(TIMESTAMP_KEY);
        if (!storedIds || !timeStamp) return [];
    
        const today = new Date().toLocaleDateString("fr-CA"); 
        if (timeStamp !== today) {
            return [];
        }
        return JSON.parse(storedIds);
    }catch (err) {
        console.error("Erreur durant la récupération", err);
        return [];
    }
}

export async function notePokemonAsDisplayed(ids: number[]): Promise<void> {
    try{
        const today = new Date().toLocaleDateString("fr-CA");
        await AsyncStorage.setItem(DISPLAYED_POKEMONS_KEY, JSON.stringify(ids));
        await AsyncStorage.setItem(TIMESTAMP_KEY, today);
        
    }catch (err) {
        console.error("Erreur durant la sauvegarde", err);
    } 
}
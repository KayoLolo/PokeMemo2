import AsyncStorage from "@react-native-async-storage/async-storage";

const DISPLAYED_POKEMONS_KEY = "@pokemon_displayed_ids";
const TIMESTAMP_KEY = "@pokemon_timestamp";

export async function getDisplayedPokemonIds() {
    try{
        const storedIds = await AsyncStorage.getItem('@pokemon_displayed_ids');
        const timestamp = await AsyncStorage.getItem('@pokemon_timestamp');
        if (!storedIds || !timestamp) return [];
    
        const elapsed = Date.now() - parseInt(timestamp);
        const timeBeforeReload = 24*60*60*1000;
    
        if (elapsed > timeBeforeReload) {
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
        await AsyncStorage.setItem('@pokemon_displayed_ids', JSON.stringify(ids));
        await AsyncStorage.setItem('@pokemon_timestamp', String(Date.now()));
    }catch (err) {
        console.error("Erreur durant la sauvegarde", err);
    } 
}
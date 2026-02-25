import axios from "axios";

export const MAX_GUESSES = 1;
export const DIFFICULTY = 1;

export const storeWordLocally = (word: string) => {
    localStorage.setItem("word", word);
};

export const fetchWord = async (wordLength: number): Promise<string | null> => {
    try {
        const response = await axios.get(
            `https://random-word-api.herokuapp.com/word?length=${wordLength}&diff=${DIFFICULTY}`
        );

        const word = response.data?.[0];

        return word ? word.toUpperCase() : null;
    } catch (error) {
        console.error("Error fetching word:", error);
        return null;
    }
};

export const isValidWord = async (word: string): Promise<boolean> => {
    try {
        const res = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
        );
        return res.status === 200;
    } catch {
        return false;
    }
};

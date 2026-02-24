import axios from "axios";

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;
export const DIFFICULTY = 1;

export const storeWordLocally = (word: string) => {
    localStorage.setItem("word", word);
};

export const fetchWord = async (): Promise<string | null> => {
    try {
        const response = await axios.get(
            `https://random-word-api.herokuapp.com/word?length=${WORD_LENGTH}&diff=${DIFFICULTY}`
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

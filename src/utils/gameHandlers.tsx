import axios from "axios";
import {fetchWord, isValidWord, storeWordLocally, MAX_GUESSES} from "./wordService";

export const  initializeWordTask = async (
    setTargetWord: (word: string) => void,
    wordLength: number
) => {
    const storedWord = localStorage.getItem("word");

    // If word already exists and has correct length, use it
    if (storedWord && storedWord.length === wordLength) {
        setTargetWord(storedWord);
        return;
    }

    // Warm up dictionary API (cold start optimization)
    axios
        .get("https://api.dictionaryapi.dev/api/v2/entries/en/hello")
        .catch(() => {
        });

    const MAX_RETRIES = 5;
    let attempts = 0;
    let validWord: string | null = null;

    while (attempts < MAX_RETRIES && !validWord) {
        const word = await fetchWord(wordLength);

        if (!word) {
            attempts++;
            continue;
        }

        const existsInDictionary = await isValidWord(word);

        if (existsInDictionary) {
            validWord = word;
        } else {
            attempts++;
        }
    }

    if (validWord) {
        setTargetWord(validWord);
        storeWordLocally(validWord);
    } else {
        console.warn("Could not fetch valid dictionary word. Using fallback.");
    }
};

interface KeyPressParams {
    key: string;
    currentGuess: string;
    guesses: string[];
    targetWord: string;
    wordLength: number;
    setCurrentGuess: (guess: string | ((prev: string) => string)) => void;
    setGuesses: (guesses: string[] | ((prev: string[]) => string[])) => void;
    setError: (error: string | null) => void;
    setDisabledState: (disabled: boolean) => void;
}

export const handleKeyPress = async ({
                                         key,
                                         currentGuess,
                                         guesses,
                                         targetWord,
                                         wordLength,
                                         setCurrentGuess,
                                         setGuesses,
                                         setError,
                                         setDisabledState,
                                     }: KeyPressParams) => {
    if (key === "ENTER") {
        if (currentGuess.length !== wordLength) return;
        if (guesses.length >= MAX_GUESSES) return;
        setDisabledState(true);

        const valid = await isValidWord(currentGuess);

        if (!valid) {
            setError("Not a valid word");
            setDisabledState(false);
            return;
        }

        const isCorrect = currentGuess === targetWord;
        if (isCorrect) {
            // Clear stored word so next reload starts fresh
            localStorage.removeItem("word");
        }

        setDisabledState(isCorrect);
        setError(null);
        setGuesses((prev) => [...prev, currentGuess]);
        setCurrentGuess("");
        return;
    }

    if (key === "⌫") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        setError(null);
        return;
    }

    if (currentGuess.length < wordLength) {
        setError(null);
        setCurrentGuess((prev) => (prev + key));
    }
};

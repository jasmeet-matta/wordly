import axios from "axios"
import {GameBoard} from "@/components/GameBoard/GameBoard"
import {getRowStatuses, type TileStatus} from "@/utils/getRowStatuses"
import {Keyboard} from "@/components/Keyboard/Keyboard"
import {useState} from "react"
import {useEffect} from "react"

function App() {
    const WORD_LENGTH = 5
    const MAX_GUESSES = 6

    const [guesses, setGuesses] = useState<string[]>([])
    const [currentGuess, setCurrentGuess] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [disableKeyboard, setDisabledState] = useState(false)
    const TARGET_WORD = "NIGHT";

    const isValidWord = async (word: string) => {
        try {
            const res = await axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
            )
            setDisabledState(false);
            return res.status === 200
        } catch {
            setDisabledState(false);
            return false
        }
    }

    useEffect(() => {
        // Warm up dictionary API to avoid cold start lag
        axios
            .get("https://api.dictionaryapi.dev/api/v2/entries/en/hello")
            .catch(() => {})
    }, [])


    const letterStatuses = guesses.reduce<Record<string, TileStatus>>(
        (acc, guess) => {
            const statuses = getRowStatuses(guess, TARGET_WORD)

            guess.split("").forEach((letter, i) => {
                const status = statuses[i]

                if (
                    status === "correct" ||
                    (status === "present" && acc[letter] !== "correct") ||
                    (!acc[letter] && status === "absent")
                ) {
                    acc[letter] = status
                }
            })

            return acc
        },
        {}
    )

    const onKeyPress = async (key: string) => {
        if (key === "ENTER") {
            if (currentGuess.length !== WORD_LENGTH) return
            if (guesses.length >= MAX_GUESSES) return
            setDisabledState(true)

            const valid = await isValidWord(currentGuess)

            if (!valid) {
                setError("Not a valid word")
                return
            }

            setDisabledState(TARGET_WORD === currentGuess)
            setError(null)
            setGuesses(prev => [...prev, currentGuess])
            setCurrentGuess("")
            return
        }

        if (key === "⌫") {
            setCurrentGuess((prev) => prev.slice(0, -1))
            setError(null)
            return
        }

        if (currentGuess.length < WORD_LENGTH) {
            setError(null)
            setCurrentGuess((prev) => prev + key)
        }
    }

    return (
        <div className="min-h-dvh bg-background text-foreground flex items-center justify-center">
            <main className="w-full max-w-md px-4">
                <h1 className="text-4xl font-bold text-center tracking-wider p-2 mb-3 text-transparent bg-clip-text bg-gradient-to-r to-amber-600 from-amber-100">
                    Wordly
                </h1>

                <GameBoard
                    guesses={guesses}
                    currentGuess={currentGuess}
                    wordLength={WORD_LENGTH}
                    maxGuesses={MAX_GUESSES}
                    targetWord={TARGET_WORD}
                />
                {error && (
                    <p className="text-md text-red-400 font-medium text-center mt-2 animate">
                        {error}
                    </p>
                )}

                <Keyboard
                    onKeyPress={onKeyPress}
                    letterStatuses={letterStatuses}
                    disableKeyboard={disableKeyboard}
                />

            </main>
        </div>
    )
}

export default App

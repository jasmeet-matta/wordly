import axios from "axios"
import {useEffect} from "react"
import {useState} from "react"

import {getRowStatuses, type TileStatus} from "@/utils/getRowStatuses"
import {useOnlineStatus} from "@/utils/useOnlineStatus"
import {GameBoard} from "@/components/GameBoard/GameBoard"
import {GameStatus} from "@/components/GameStatus/GameStatus"
import {Keyboard} from "@/components/Keyboard/Keyboard"
import NetworkStatusBar from "@/components/NetworkStatusBar"
import {ThemeToggle} from "@/components/ThemeToggle/ThemeToggle"

function App() {
    const WORD_LENGTH = 5
    const MAX_GUESSES = 6
    const DIFFICULTY = 1

    const isOnline = useOnlineStatus()
    const [error, setError] = useState<string | null>(null)
    const [disableKeyboard, setDisabledState] = useState(false)
    const [targetWord, setTargetWord] = useState<string>("HELLO")
    const [currentGuess, setCurrentGuess] = useState("")
    const [guesses, setGuesses] = useState<string[]>(() => {
        const savedGuesses = localStorage.getItem("guesses")
        return savedGuesses ? JSON.parse(savedGuesses) : []
    })
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        const savedTheme = localStorage.getItem("theme")
        return savedTheme === "dark" ? "dark" : "light"
    })

    const storeWordLocally = (word: string) => {
        localStorage.setItem('word', word)
    }

    const fetchWord = async (): Promise<string | null> => {
        try {
            const response = await axios.get(
                `https://random-word-api.herokuapp.com/word?length=${WORD_LENGTH}&diff=${DIFFICULTY}`
            )

            const word = response.data?.[0]

            return word ? word.toUpperCase() : null
        } catch (error) {
            console.error("Error fetching word:", error)
            return null
        }
    }

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
        const initializeWord = async () => {
            const storedWord = localStorage.getItem("word")

            // If word already exists, use it
            if (storedWord) {
                setTargetWord(storedWord)
                return
            }

            // Warm up dictionary API (cold start optimization)
            axios
                .get("https://api.dictionaryapi.dev/api/v2/entries/en/hello")
                .catch(() => {})

            const MAX_RETRIES = 5
            let attempts = 0
            let validWord: string | null = null

            while (attempts < MAX_RETRIES && !validWord) {
                const word = await fetchWord()

                if (!word) {
                    attempts++
                    continue
                }

                const existsInDictionary = await isValidWord(word)

                if (existsInDictionary) {
                    validWord = word
                } else {
                    attempts++
                }
            }

            if (validWord) {
                setTargetWord(validWord)
                storeWordLocally(validWord)
            } else {
                console.warn("Could not fetch valid dictionary word. Using fallback.")
            }
        }

        initializeWord()
    }, [])


    const letterStatuses = guesses.reduce<Record<string, TileStatus>>(
        (acc, guess) => {
            const statuses = getRowStatuses(guess, targetWord)

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

            const isCorrect = currentGuess === targetWord
            if (isCorrect) {
                // Clear stored word so next reload starts fresh
                localStorage.removeItem("word")
            }

            setDisabledState(isCorrect)
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

    const lastGuess = guesses[guesses.length - 1]
    const isGameWon = lastGuess === targetWord
    const isGameLost = guesses.length === MAX_GUESSES && lastGuess !== targetWord

    useEffect(() => {
        if (!guesses.length) return

        localStorage.setItem("guesses", JSON.stringify(guesses))
    }, [guesses])

    useEffect(() => {
        if (!isGameWon && !isGameLost) return

        localStorage.removeItem("word")
        localStorage.removeItem("guesses")
    }, [isGameWon, isGameLost])

    return (
        <div
            className="min-h-dvh text-foreground flex items-center justify-center transition-colors duration-300"
            style={{
                backgroundColor: theme === "dark" ? "#1c1d23" : "#fafafa",
            }}
        >
            <ThemeToggle theme={theme} setTheme={setTheme} />

            <main className="w-full max-w-md px-4">
                <h1 className="text-4xl font-bold text-center tracking-wider p-2 mb-3 text-transparent bg-clip-text bg-gradient-to-r to-amber-600 from-amber-100">
                    Wordly
                </h1>

                <GameBoard
                    guesses={guesses}
                    currentGuess={currentGuess}
                    wordLength={WORD_LENGTH}
                    maxGuesses={MAX_GUESSES}
                    targetWord={targetWord}
                    theme={theme}
                />
                <GameStatus
                    isGameWon={isGameWon}
                    isGameLost={isGameLost}
                    targetWord={targetWord}
                    theme={theme}
                />

                {error && (
                    <p className="text-md text-red-400 font-medium text-center mt-2 animate">
                        {error}
                    </p>
                )}

                <Keyboard
                    onKeyPress={onKeyPress}
                    letterStatuses={letterStatuses}
                    disableKeyboard={disableKeyboard || isGameLost}
                    theme={theme}
                />

            </main>
            <NetworkStatusBar isOnline={isOnline} />
        </div>
    )
}

export default App

import confetti from "canvas-confetti"
import {useEffect} from "react"
import {useState} from "react"

import {getRowStatuses, type TileStatus} from "@/utils/getRowStatuses"
import {useOnlineStatus} from "@/utils/useOnlineStatus"
import {MAX_GUESSES} from "@/utils/wordService"
import {initializeWordTask, handleKeyPress} from "@/utils/gameHandlers"
import {GameBoard} from "@/components/GameBoard/GameBoard"
import {GameStatus} from "@/components/GameStatus/GameStatus"
import {Keyboard} from "@/components/Keyboard/Keyboard"
import NetworkStatusBar from "@/components/NetworkStatusBar"
import {ThemeToggle} from "@/components/ThemeToggle/ThemeToggle"
import {SideMenu} from "@/components/SideMenu/SideMenu"

function App() {

    const isOnline = useOnlineStatus()
    const [error, setError] = useState<string | null>(null)
    const [disableKeyboard, setDisabledState] = useState(false)
    const [wordLength, setWordLength] = useState<number>(() => {
        const saved = localStorage.getItem("wordLength")
        return saved ? parseInt(saved) : 5
    })
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

    useEffect(() => {
        localStorage.setItem("wordLength", wordLength.toString())
        
        const storedWord = localStorage.getItem("word")
        if (storedWord && storedWord.length !== wordLength) {
            localStorage.removeItem("word")
            localStorage.removeItem("guesses")
            // Use setTimeout to avoid synchronous setState in effect (linting requirement)
            setTimeout(() => {
                setGuesses([])
                setCurrentGuess("")
            }, 0)
        }
        
        void initializeWordTask(setTargetWord, wordLength)
    }, [wordLength])


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

    const onKeyPress = (key: string) => {
        void handleKeyPress({
            key,
            currentGuess,
            guesses,
            targetWord,
            wordLength,
            setCurrentGuess,
            setGuesses,
            setError,
            setDisabledState
        })
    }

    const lastGuess = guesses[guesses.length - 1]
    const isGameWon = lastGuess === targetWord
    const isGameLost = guesses.length === MAX_GUESSES && lastGuess !== targetWord

    useEffect(() => {
        if (!guesses.length) return

        localStorage.setItem("guesses", JSON.stringify(guesses))
    }, [guesses])

    useEffect(() => {
        if (!isGameWon && !isGameLost) return;

        if (isGameWon) {
            confetti({
                particleCount: 100,
                spread: 60,
                origin: { y: 0.6 },
                colors: [
                    '#ff595e', // bright red
                    '#ffca3a', // vibrant yellow
                    '#8ac926', // lively green
                    '#1982c4', // bold blue
                    '#6a4c93'  // rich purple
                ],
                scalar: 1.1,
                shapes: ['circle', 'square']
            });
        }

        localStorage.removeItem("word");
        localStorage.removeItem("guesses");
    }, [isGameWon, isGameLost]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (disableKeyboard || isGameWon || isGameLost) return;

            const key = e.key.toUpperCase();

            if (key === 'ENTER') {
                onKeyPress('ENTER');
            } else if (key === 'BACKSPACE') {
                onKeyPress('⌫');
            } else if (/^[A-Z]$/.test(key)) {
                onKeyPress(key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onKeyPress, disableKeyboard, isGameWon, isGameLost]);

    return (
        <div
            className="min-h-dvh w-full text-foreground flex items-center justify-center transition-colors duration-300 relative"
            style={{
                backgroundColor: theme === "dark" ? "#17171c" : "#fafafa",
            }}
        >
            <SideMenu wordLength={wordLength} setWordLength={setWordLength} theme={theme} />
            <ThemeToggle theme={theme} setTheme={setTheme} />

            <main className="w-full max-w-lg px-4 flex flex-col items-center justify-center py-8">
                <h1 className="text-4xl sm:text-5xl font-bold text-center tracking-wider p-2 mb-3 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r to-amber-500 from-amber-200">
                    Wordly
                </h1>

                <GameBoard
                    guesses={guesses}
                    currentGuess={currentGuess}
                    wordLength={wordLength}
                    maxGuesses={MAX_GUESSES}
                    targetWord={targetWord}
                    theme={theme}
                    invalidWord={!!error}
                />
                <GameStatus
                    isGameWon={isGameWon}
                    isGameLost={isGameLost}
                    targetWord={targetWord}
                    theme={theme}
                />

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

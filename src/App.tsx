import { useState } from "react"
import { GameBoard } from "@/components/GameBoard/GameBoard"
import { Keyboard } from "@/components/Keyboard/Keyboard"

function App() {
    const WORD_LENGTH = 5
    const MAX_GUESSES = 6

    const [guesses, setGuesses] = useState<string[]>([])
    const [currentGuess, setCurrentGuess] = useState("")

    const onKeyPress = (key: string) => {
        if (key === "ENTER") {
            if (currentGuess.length !== WORD_LENGTH) return
            if (guesses.length >= MAX_GUESSES) return

            setGuesses(prev => [...prev, currentGuess])
            setCurrentGuess("")
            return
        }

        if (key === "⌫") {
            setCurrentGuess((prev) => prev.slice(0, -1))
            return
        }

        if (currentGuess.length < WORD_LENGTH) {
            setCurrentGuess((prev) => prev + key)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
            <main className="w-full max-w-md px-4">
                <h1 className="text-3xl font-bold text-center mb-6">
                    wordly
                </h1>

                <GameBoard
                    guesses={guesses}
                    currentGuess={currentGuess}
                    wordLength={WORD_LENGTH}
                    maxGuesses={MAX_GUESSES}
                />

                <Keyboard onKeyPress={onKeyPress} />
            </main>
        </div>
    )
}

export default App

import {GameBoard} from "@/components/GameBoard/GameBoard"
import {Keyboard} from "@/components/Keyboard/Keyboard.tsx";

function App() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
            <main className="w-full max-w-md px-4">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Wordly
                </h1>
                <GameBoard />
                <Keyboard />
            </main>
        </div>
    )
}

export default App

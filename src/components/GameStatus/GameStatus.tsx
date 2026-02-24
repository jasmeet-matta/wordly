interface GameStatusProps {
  isGameWon: boolean;
  isGameLost: boolean;
  targetWord: string;
  theme: "light" | "dark";
}

export const GameStatus = ({
  isGameWon,
  isGameLost,
  targetWord,
  theme,
}: GameStatusProps) => {
  if (isGameWon) {
    return (
      <div className="mt-4 p-3 rounded-md border border-green-500/30 bg-green-500/10 text-center">
        <p className="text-md uppercase tracking-wide text-green-400">
          You guessed it!
        </p>
      </div>
    );
  }

  if (isGameLost) {
    return (
      <div
        className={`mt-4 p-3 rounded-md border text-center
                        ${
                          theme === "dark"
                            ? "bg-transparent/20 border-transparent/50"
                            : "border-gray-200/70 bg-muted/80"
                        }`}
      >
        <p
          className={`text-sm tracking-wide text-muted-foreground 
                        ${theme === "dark" ? "text-amber-50/80" : ""}`}
        >
          The correct word was
        </p>
        <p
          className={`text-2xl font-bold tracking-widest mt-1 
                        ${theme === "dark" ? "text-white" : "text-slate-800"}`}
        >
          {targetWord}
        </p>
      </div>
    );
  }

  return null;
};

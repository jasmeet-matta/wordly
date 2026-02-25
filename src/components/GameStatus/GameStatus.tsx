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
      <div className="mt-4 p-4 sm:p-6 w-full rounded-md border border-green-500/30 bg-green-500/10 text-center">
        <p className="text-lg sm:text-xl uppercase font-bold tracking-widest text-green-400">
          You guessed it!
        </p>
      </div>
    );
  }

  if (isGameLost) {
    return (
      <div
        className={`mt-4 p-4 sm:p-6 w-full rounded-md border text-center
                        ${
                          theme === "dark"
                            ? "bg-transparent/20 border-transparent/50"
                            : "border-gray-200/70 bg-muted/80"
                        }`}
      >
        <p
          className={`text-base sm:text-lg tracking-wide text-muted-foreground 
                        ${theme === "dark" ? "text-amber-50/80" : ""}`}
        >
          The correct word was
        </p>
        <p
          className={`text-3xl sm:text-3xl font-extrabold tracking-widest mt-2 
                        ${theme === "dark" ? "text-white" : "text-slate-800"}`}
        >
          {targetWord}
        </p>
      </div>
    );
  }

  return null;
};

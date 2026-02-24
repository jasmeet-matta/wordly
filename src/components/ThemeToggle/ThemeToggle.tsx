import {SunIcon, MoonIcon} from "@heroicons/react/24/outline";

interface ThemeToggleProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const ThemeToggle = ({ theme, setTheme }: ThemeToggleProps) => {
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 cursor-pointer select-none focus:outline-none"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <SunIcon className="h-6 w-6 text-yellow-400" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  );
};

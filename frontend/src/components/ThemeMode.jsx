import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function ThemeMode({isDark, onToggleTheme}) {

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={onToggleTheme}
        className="backdrop-blur-md p-3 rounded-full shadow-md transition duration-300 hover:scale-105"
        style={{
          background: isDark ? "#fcfcfa" : "#1e1e1e",
          color: isDark ? "#1e1e1e" : "#fcfcfa",
        }}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <SunIcon className="w-7 h-7 sm:w-9 sm:h-9 text-black-500" />
        ) : (
          <MoonIcon className="w-7 h-7 sm:w-9 sm:h-9 text-white-400" />
        )}
      </button>
    </div>
  );
}

export default ThemeMode;

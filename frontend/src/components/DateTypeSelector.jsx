import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function DateTypeSelector({ mode, onChange }) {
  const { isDark } = useContext(ThemeContext);

  return (
    <div
      className="flex bg-white/10 rounded-xl p-1.5 backdrop-blur-sm border transition-all duration-300
                    w-fit mx-auto"
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
      }}
    >
      <button
        onClick={() => onChange("single")}
        className={`px-2 py-1 sm:px-4 sm:py-2 rounded-xl font-medium transition-all duration-300
          ${
            mode === "single"
              ? "bg-gradient-to-r from-blue-500 to-teal-500 shadow-lg shadow-blue-500/25"
              : "hover:bg-white/10"
          }`}
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Single Date
        </div>
      </button>

      <button
        onClick={() => onChange("range")}
        className={`px-2 py-1 sm:px-4 sm:py-2 rounded-xl font-medium transition-all duration-300
          ${
            mode === "range"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
              : "hover:bg-white/10"
          }`}
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14-4H3m16 8H7m6 4v1a3 3 0 11-6 0v-1m6-4H9l3-3 3 3"
            />
          </svg>
          Date Range
        </div>
      </button>
    </div>
  );
}

export default DateTypeSelector;

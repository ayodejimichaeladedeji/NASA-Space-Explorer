import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function RoverTypeSelector({ rovers, selectedRover, handleChange }) {
  const { isDark } = useContext(ThemeContext);

  if (!rovers || rovers.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:gap-2 w-[280px] sm:w-80 sm:min-w-48 mx-auto">
        <div className="relative">
          <select
            value={selectedRover || ""}
            onChange={(e) => handleChange(e.target.value)}
            className={`w-full px-2 py-2 sm:py-2 sm:px-4 border rounded-xl bg-white/10 text-base transition-all backdrop-blur-sm
                        duration-300 focus:outline-none focus:border-teal-400 focus:ring-3 focus:ring-teal-400/30 disabled:opacity-50 
                        disabled:cursor-not-allowed ${
                          isDark
                            ? "placeholder:text-white/90 border-white/20 text-white"
                            : "placeholder:text-black/90 border-black/20 text-black"
                        }`}
          >
            <option value="">Select a rover</option>
            {rovers?.map((rover) => (
              <option
                key={rover.name}
                value={rover.name}
                className={isDark ? "bg-gray-800" : "bg-white"}
              >
                {rover.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default RoverTypeSelector;

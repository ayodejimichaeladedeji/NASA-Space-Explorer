import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function DateInput({ id, name, date, onChange, maxDate }) {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="flex flex-col gap-3 sm:gap-2 w-[280px] sm:w-80 sm:min-w-48 mx-auto">
      <label htmlFor={id} className={`mb-1 text-sm ${isDark ? 'text-white/90' : 'text-black/90'}`}>
        {name}
      </label>
      <input
        type="date"
        id={id}
        max={maxDate}
        value={date}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-2 py-2 sm:py-2 sm:px-4 border rounded-xl bg-white/10 text-base transition-all backdrop-blur-sm
          duration-300 focus:outline-none focus:border-teal-400 focus:ring-3 focus:ring-teal-400/30 disabled:opacity-50 
          disabled:cursor-not-allowed ${isDark ? 'border-white/20' : 'border-black/20'}`}
      />
    </div>
  );
}

export default DateInput;
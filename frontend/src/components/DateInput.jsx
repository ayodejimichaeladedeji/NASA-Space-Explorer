import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function DateInput({ id, name, date, onChange, maxDate }) {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="flex flex-col gap-3 sm:gap-2 w-[280px] sm:w-80 sm:min-w-48 mx-auto">
      <DatePicker
        id={id}
        selected={date ? new Date(date) : null}
        onChange={(dateObj) => {
          if (dateObj) {
            const localDate = format(dateObj, "yyyy-MM-dd");
            onChange(localDate);
          }
        }}
        maxDate={maxDate ? new Date(maxDate) : null}
        className={`w-full px-2 py-2 sm:py-2 sm:px-4 border rounded-xl bg-white/10 text-base transition-all backdrop-blur-sm
          duration-300 focus:outline-none focus:border-teal-400 focus:ring-3 focus:ring-teal-400/30 disabled:opacity-50 
          disabled:cursor-not-allowed ${
            isDark ? "border-white/20 text-white" : "border-black/20 text-black"
          }`}
        dateFormat="yyyy-MM-dd"
        placeholderText={name}
      />
    </div>
  );
}

export default DateInput;

import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function DateInput({ id, name, date, onChange, maxDate }) {
  const { isDark } = useContext(ThemeContext);
  const [inputType, setInputType] = useState('text');

  function handleFocus(){
    setInputType('date');
  };

  function handleBlur(e){
    if (!e.target.value) {
      setInputType('text');
    }
  };

  return (
    <>
       <div className="flex flex-col gap-3 sm:gap-2 w-[280px] sm:w-80 sm:min-w-48 mx-auto">
        <div className="relative">
          <input
            type={inputType}
            id={id}
            max={maxDate}
            placeholder={inputType === 'text' ? name : ''}
            value={date}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`w-full px-2 py-2 sm:py-2 sm:px-4 border  rounded-xl bg-white/10 text-base transition-all backdrop-blur-sm
                        duration-300 focus:outline-none focus:border-teal-400 focus:ring-3 focus:ring-teal-400/30 disabled:opacity-50 
                        disabled:cursor-not-allowed ${isDark ? 'placeholder:text-white/90 border-white/20' : 'placeholder:text-black/90 border-black/20'}`}
          />
        </div>
      </div>
    </>
  );
}

export default DateInput;
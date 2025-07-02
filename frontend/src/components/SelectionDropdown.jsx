import { useState, useContext, useRef, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

function SelectionDropdown({ id, name, value, onChange, options = [] }) {
  const { isDark } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="flex flex-col gap-3 sm:gap-2 w-[280px] sm:w-full sm:min-w-48 mx-auto">
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-2 py-2 sm:py-2 sm:px-4 border rounded-xl bg-white/10 text-base transition-all backdrop-blur-sm
                      duration-300 focus:outline-none focus:border-teal-400 focus:ring-3 focus:ring-teal-400/30 disabled:opacity-50 
                      disabled:cursor-not-allowed text-left flex items-center justify-between ${
                        isDark ? 'placeholder:text-white/90 border-white/20 text-white' : 'placeholder:text-black/90 border-black/20 text-black'
                      }`}
        >
          <span className={selectedOption ? '' : (isDark ? 'text-white/90' : 'text-black/90')}>
            {selectedOption ? selectedOption.label : name}
          </span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${
              isDark ? 'text-white/70' : 'text-black/70'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className={`absolute top-full left-0 right-0 z-50 mt-1 border rounded-xl bg-white/10 backdrop-blur-sm shadow-lg
                          max-h-60 overflow-y-auto ${
                            isDark ? 'border-white/20' : 'border-black/20'
                          }`}>
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full px-2 py-2 sm:py-2 sm:px-4 text-left text-base transition-colors duration-150
                           hover:bg-white/20 focus:outline-none focus:bg-white/20 ${
                             index === 0 ? 'rounded-t-xl' : ''
                           } ${
                             index === options.length - 1 ? 'rounded-b-xl' : ''
                           } ${
                             isDark ? 'text-white hover:text-white' : 'text-black hover:text-black'
                           } ${
                             value === option.value ? 'bg-teal-400/20' : ''
                           }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectionDropdown;
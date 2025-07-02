import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function BackButton({ isDark }) {
  return (
    <div className="fixed bottom-4 left-4 z-40">
      <Link
        to=".."
        relative="path"
        className={`p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 
          focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center
          ${isDark ? "bg-white text-black" : "bg-black text-white"}`}
        aria-label="Go back"
      >
        <ArrowLeftIcon className="w-7 h-7 sm:w-9 sm:h-9 fill-current" />
      </Link>
    </div>
  );
}

export default BackButton;
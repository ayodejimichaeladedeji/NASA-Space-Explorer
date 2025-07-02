import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

import MarsImageModal from "./MarsImageModal";

function MarsImageCard({ image, index = 0 }) {
  const { isDark } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDelayClass = (index) => {
    const delays = ["", "delay-75", "delay-150", "delay-300", "delay-500"];
    return delays[Math.min(index, delays.length - 1)] || "delay-500";
  };

  const animationDelay = getDelayClass(index);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (!image) {
    return null;
  }

  const handleViewDetails = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <article
        className={`group bg-white/10 backdrop-blur-md border ${
          isDark ? "border-white/20" : "border-black/10"
        } rounded-2xl overflow-hidden 
                   transition-all duration-500 ease-out hover:scale-[1.02] hover:bg-white/15 
                   hover:border-white/30 hover:shadow-2xl hover:shadow-blue-500/20
                   animate-fade-in-up ${animationDelay}`}
      >
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden">
          <img
            src={image.img_src}
            alt={image.title || "APOD Image"}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-700 ease-out 
                       group-hover:scale-110 group-hover:brightness-110"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                        flex items-end justify-between p-4 sm:p-5"
          >
            <div
              className="bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 
                          rounded-full text-xs sm:text-sm font-medium text-white
                          border border-white/30 shadow-lg"
            >
              {formatDate(image.earth_date)}
            </div>
          </div>
        </div>

        <div className="p-2 sm:p-3 lg:p-6 space-y-1 sm:space-y-2">
          <h2
            className={`text-2xs sm:text-sm font-bold leading-tight
                      ${
                        isDark
                          ? "text-white/95 group-hover:text-white"
                          : "text-black/95 group-hover:text-black"
                      }
                        transition-colors duration-300
                       line-clamp-2`}
          >
            Rover Name: {image.rover.name}
          </h2>

          <p
            className={`text-sm sm:text-xs leading-relaxed transition-colors duration-300
                      line-clamp-3 sm:line-clamp-4 first-letter:uppercase ${
                        isDark
                          ? "text-white/80 group-hover:text-white/90"
                          : "text-black/80 group-hover:text-black/90"
                      }`}
          >
            Camera Name: {image.camera.name}
          </p>

          <div className="pt-2">
            <button
              onClick={handleViewDetails}
              className={`inline-flex items-center gap-2 px-4 py-2.5 sm:px-3 sm:py-2
                       bg-gradient-to-r from-cyan-500 to-blue-600 
                       hover:from-cyan-400 hover:to-blue-500
                        font-semibold text-sm sm:text-base ${
                          isDark ? "text-white" : "text-black"
                        }
                       rounded-xl transition-all duration-300 
                       hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/30
                       focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2
                       focus:ring-offset-transparent transform active:scale-95`}
            >
              <span>View Full Image</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </button>
          </div>
        </div>
      </article>

      <MarsImageModal
        image={image}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default MarsImageCard;

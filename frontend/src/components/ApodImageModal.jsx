import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ApodImageModal({ image, isOpen, onClose }) {
  const { isDark } = useContext(ThemeContext);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (showFullscreen) {
          setShowFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, showFullscreen]);

  useEffect(() => {
    if (isOpen) {
      setImageLoaded(false);
      setImageDimensions({ width: 0, height: 0 });
      setShowFullscreen(false);
    }
  }, [isOpen, image]);

  const handleImageClick = () => {
    if (image.media_type === "image") {
      setShowFullscreen(true);
    }
  };

  const handleFullscreenClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowFullscreen(false);
    }
  };

  if (!isOpen || !image) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const hasHdUrl = image.hdurl && image.hdurl !== image.url;
  const imageUrl = image.url || image.hdurl;
  const hdUrl = hasHdUrl ? image.hdurl : image.url;

  const handleImageLoad = (e) => {
    const img = e.target;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.9;

    const aspectRatio = naturalWidth / naturalHeight;

    let finalWidth = naturalWidth;
    let finalHeight = naturalHeight;

    if (naturalWidth > maxWidth || naturalHeight > maxHeight) {
      if (aspectRatio > 1) {
        finalWidth = Math.min(naturalWidth, maxWidth);
        finalHeight = finalWidth / aspectRatio;

        if (finalHeight > maxHeight) {
          finalHeight = maxHeight;
          finalWidth = finalHeight * aspectRatio;
        }
      } else {
        finalHeight = Math.min(naturalHeight, maxHeight);
        finalWidth = finalHeight * aspectRatio;

        if (finalWidth > maxWidth) {
          finalWidth = maxWidth;
          finalHeight = finalWidth / aspectRatio;
        }
      }
    }

    const minWidth = 400;
    const minHeight = 300;

    if (finalWidth < minWidth) {
      finalWidth = minWidth;
      finalHeight = finalWidth / aspectRatio;
    }

    if (finalHeight < minHeight) {
      finalHeight = minHeight;
      finalWidth = finalHeight * aspectRatio;
    }

    setImageDimensions({ width: finalWidth, height: finalHeight });
    setImageLoaded(true);
  };

  const modalWidth = imageLoaded ? imageDimensions.width + 400 : 800;
  const modalHeight = imageLoaded ? Math.max(imageDimensions.height, 400) : 600;

  if (showFullscreen) {
    return (
      <div
        className="fixed inset-0 z-60 flex items-center justify-center bg-black cursor-pointer"
        onClick={handleFullscreenClick}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          </div>
        )}

        <img
          src={hdUrl}
          alt={image.title || "APOD Image"}
          loading="lazy"
          className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onClick={() => setShowFullscreen(false)}
          onError={(e) => {
            if (hasHdUrl && e.target.src !== image.url) {
              e.target.src = image.url;
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm xl:p-4">
      <div
        className={`relative ${
          isDark ? "bg-gray-900 border border-gray-700" : "bg-white"
        } xl:rounded-2xl shadow-2xl overflow-hidden animate-fade-in w-full h-full xl:w-auto xl:h-auto`}
        style={
          window.innerWidth >= 1280
            ? {
                width: `${Math.min(modalWidth, window.innerWidth * 0.95)}px`,
                height: `${Math.min(modalHeight, window.innerHeight * 0.9)}px`,
                maxWidth: "95vw",
                maxHeight: "90vh",
                opacity: imageLoaded || image.media_type !== "image" ? 1 : 0.7,
                transition: "all 0.3s ease-in-out",
              }
            : {}
        }
      >
        <div className="flex flex-col xl:flex-row h-full">
          <div
            className="relative bg-gray-900 flex items-center justify-center w-full xl:w-auto h-1/2 xl:h-full cursor-pointer"
            style={
              window.innerWidth >= 1280
                ? {
                    width: imageLoaded ? `${imageDimensions.width}px` : "60%",
                    minWidth: "300px",
                  }
                : {}
            }
            onClick={handleImageClick}
          >
            {image.media_type === "image" ? (
              <img
                src={imageUrl}
                alt={image.title || "APOD Image"}
                className={`${
                  window.innerWidth >= 1280
                    ? "w-full h-full object-contain"
                    : "w-full h-full object-cover"
                }`}
                onLoad={handleImageLoad}
                onError={(e) => {
                  if (hasHdUrl && e.target.src !== image.url) {
                    e.target.src = image.url;
                  }
                }}
                style={
                  window.innerWidth >= 1280
                    ? {
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }
                    : {}
                }
              />
            ) : (
              <div className="flex items-center justify-center text-white p-4">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-lg">Media content not displayable</p>
                </div>
              </div>
            )}

            {!imageLoaded && image.media_type === "image" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}

            {image.media_type === "image" && (
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-75">
                Click to view full size
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between w-full xl:min-w-[350px] xl:w-[400px] h-1/2 xl:h-full overflow-y-auto">
            <div className="p-4 xl:p-8 space-y-4 xl:space-y-6 flex-grow overflow-y-auto">
              <div>
                <h2
                  className={`text-lg xl:text-2xl font-bold leading-tight ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {image.title || "Untitled"}
                </h2>
                <p
                  className={`text-xs xl:text-sm mt-1 xl:mt-2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {formatDate(image.date)}
                </p>
              </div>

              {image.copyright && (
                <div>
                  <h3
                    className={`text-xs xl:text-sm font-bold mb-1 xl:mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Copyright: {image.copyright}
                  </h3>
                </div>
              )}

              <div>
                <p
                  className={`text-xs xl:text-sm text-justify first-letter:uppercase leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {image.explanation || "No description available"}
                </p>
              </div>
            </div>

            <div
              className={`p-4 xl:p-8 pt-2 xl:pt-6 border-t flex-shrink-0 ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row xl:flex-col gap-2 xl:gap-3">
                <a
                  href={hdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 
                           px-4 xl:px-6 py-2.5 xl:py-3 text-sm xl:text-base
                           bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                           text-white font-semibold rounded-lg xl:rounded-xl 
                           transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 
                           active:scale-95
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span>{hasHdUrl ? "View HD Picture" : "View Picture"}</span>
                  <svg
                    className="w-3 h-3 xl:w-4 xl:h-4"
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
                </a>

                <button
                  onClick={onClose}
                  className={`px-4 xl:px-6 py-2.5 xl:py-3 text-sm xl:text-base font-semibold 
                           rounded-lg xl:rounded-xl transition-all duration-200 hover:shadow-md 
                           active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                             isDark
                               ? "bg-gray-700 hover:bg-gray-600 text-gray-200 focus:ring-gray-500"
                               : "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-400"
                           }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApodImageModal;

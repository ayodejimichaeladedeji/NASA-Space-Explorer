import { useEffect, useState } from "react";

function MarsImageModal({ image, isOpen, onClose }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
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
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setImageLoaded(false);
    }
  }, [isOpen, image]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
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

  const imageUrl = image.img_src;

  return (
    <>
      <div 
        className="fixed inset-0 z-[99] backdrop-blur-md bg-black/60"
        onClick={handleBackdropClick}
      />
      
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer m-11 pointer-events-none"
      >
        <div className="relative w-full h-full pointer-events-auto" onClick={handleBackdropClick}>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}

          <img
            src={imageUrl}
            alt={`Mars rover ${image.rover?.name || 'image'} - Sol ${image.sol || 'unknown'}`}
            loading="lazy"
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onClick={onClose}
            onError={(e) => {
              console.error('Failed to load Mars rover image:', e);
            }}
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
            aria-label="Close image"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>

          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg text-sm opacity-75 hover:opacity-100 transition-opacity">
            <div>{image.rover?.name || 'Mars Rover'} - Sol {image.sol || 'N/A'}</div>
            <div>{formatDate(image.earth_date)}</div>
            <div>{image.camera?.full_name || image.camera?.name || 'Camera'}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MarsImageModal;
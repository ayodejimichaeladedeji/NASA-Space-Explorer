import { useRef, useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import Banner from "../components/Banner";
import BackButton from "../components/BackButton";
import MarsImageCard from "../components/MarsImageCard";
import RoverTypeSelector from "../components/RoverTypeSelector";

import {
  useActiveRovers,
  useRoverManifest,
  usePhotosBySol,
} from "../hooks/useMarsRovers";

function Shimmer({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-white/20 via-white/30 to-white/20 bg-[length:200%_100%] animate-shimmer ${className}`}
    ></div>
  );
}

function BrowseBySolPage() {
  const { isDark } = useContext(ThemeContext);

  const solInputRef = useRef(null);

  const [sol, setSol] = useState("");
  const [cameras, setCameras] = useState([]);
  const [roverName, setRoverName] = useState();
  const [selectedCamera, setSelectedCamera] = useState("");

  const {
    data: rovers,
    loading: loadingRovers,
    error: errorRovers,
  } = useActiveRovers();

  const {
    data: roverInformation,
    loading: loadingManifest,
    error: errorManifest,
  } = useRoverManifest(roverName);

  const {
    data: photos,
    loading: loadingPhotos,
    error: errorPhotos,
  } = usePhotosBySol({
    roverName,
    sol: sol,
    camera: selectedCamera,
  });

  useEffect(() => {
    if (roverName) {
      setSol("");
      setCameras([]);
      setSelectedCamera("");
    }
  }, [roverName]);

  useEffect(() => {
    if (sol) {
      setSelectedCamera("");
    }
  }, [sol]);

  function handleRoverTypeChange(name) {
    setRoverName(name);
  }

  function handleSolChange() {
    const solValue = solInputRef.current?.value;
    const solNumber = parseInt(solValue);
    setSol(solNumber);
    if (roverInformation?.photo_manifest?.photos) {
      let availableCameras = roverInformation.photo_manifest.photos.find(
        (x) => x.sol === solNumber
      );
      setCameras(availableCameras?.cameras || []);
    }
  }

  function handleCameraSelect(camera) {
    setSelectedCamera(camera);
  }

  function ShimmerCard({ index = 0 }) {
    const getDelayClass = (index) => {
      const delays = ["", "delay-75", "delay-150", "delay-300", "delay-500"];
      return delays[Math.min(index, delays.length - 1)] || "delay-500";
    };

    const animationDelay = getDelayClass(index);

    return (
      <div
        className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden
                      transition-all duration-500 ease-out animate-fade-in-up ${animationDelay}`}
      >
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden">
          <Shimmer className="w-full h-full" />
        </div>

        <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
          {/* Title shimmer */}
          <Shimmer className="h-6 sm:h-7 lg:h-8 w-3/4 rounded" />

          <div className="space-y-2">
            <Shimmer className="h-4 w-full rounded" />
            <Shimmer className="h-4 w-5/6 rounded" />
            <Shimmer className="h-4 w-4/5 rounded" />
          </div>

          <div className="pt-2">
            <Shimmer className="h-10 sm:h-12 w-32 sm:w-36 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  function renderSmartGrid(images, isShimmer = false) {
    const count = images.length;

    if (count === 1) {
      return (
        <div className="flex justify-center">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
            {isShimmer ? (
              <ShimmerCard index={0} />
            ) : (
              <MarsImageCard image={images[0]} index={0} />
            )}
          </div>
        </div>
      );
    }

    if (count === 2) {
      return (
        <div className="flex flex-col lg:flex-row justify-center gap-4 sm:gap-6 lg:gap-8">
          {images.map((image, index) => (
            <div
              key={isShimmer ? index : `${image.id || image.sol}-${index}`}
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
            >
              {isShimmer ? (
                <ShimmerCard index={index} />
              ) : (
                <MarsImageCard image={image} index={index} />
              )}
            </div>
          ))}
        </div>
      );
    }

    if (count === 3) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {images.map((image, index) =>
            isShimmer ? (
              <ShimmerCard key={index} index={index} />
            ) : (
              <MarsImageCard
                key={`${image.id || image.sol}-${index}`}
                image={image}
                index={index}
              />
            )
          )}
        </div>
      );
    }

    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {images.map((image, index) =>
            isShimmer ? (
              <ShimmerCard key={index} index={index} />
            ) : (
              <MarsImageCard
                key={`${image.id || image.sol}-${index}`}
                image={image}
                index={index}
              />
            )
          )}
        </div>
      </div>
    );
  }

  if (loadingRovers) {
    return (
      <>
        <Banner
          mainText="Images from Active Rovers on Mars 🪐"
          subText="Loading rovers..."
        />
        <div className="relative z-10 max-w-6xl mx-auto -mt-10 sm:-mt-12">
          <section className="glass rounded-2xl p-5 sm:p-6.5">
            <div className="flex flex-col items-center mb-2">
              <Shimmer className="h-12 w-64 rounded-xl" />
            </div>
          </section>
        </div>
      </>
    );
  }

  if (errorRovers) {
    return (
      <>
        <Banner
          mainText="Images from Active Rovers on Mars 🪐"
          subText="Error loading rovers"
        />
        <div className="relative z-10 max-w-6xl mx-auto -mt-10 sm:-mt-12">
          <section className="glass rounded-2xl p-5 sm:p-6.5">
            <div className="flex flex-col items-center mb-2">
              <p className="text-red-400">
                Failed to load rovers. Please try again.
              </p>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Banner
        mainText="Images from Active Rovers on Mars 🪐"
        subText={
          roverName
            ? `Browsing ${roverName} Rover Images`
            : "Select a rover to begin"
        }
      />
      <div className="relative z-10 max-w-6xl mx-auto -mt-10 sm:-mt-12">
        <section className="glass rounded-2xl p-5 sm:p-6.5">
          <div className="flex flex-col items-center mb-2">
            {!roverName && (
              <RoverTypeSelector
                rovers={rovers}
                selectedRover={roverName}
                handleChange={handleRoverTypeChange}
              />
            )}

            {roverName && !sol && (
              <>
                {loadingManifest ? (
                  <div className="flex flex-col items-center space-y-2">
                    <Shimmer className="h-12 w-64 rounded-xl" />
                    <p className="text-sm text-gray-400">
                      Loading rover information...
                    </p>
                  </div>
                ) : errorManifest ? (
                  <div className="text-center">
                    <p className="text-red-400 mb-2">
                      Failed to load rover information
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-3 py-1 text-sm bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 w-[280px] sm:w-80">
                    <input
                      ref={solInputRef}
                      type="number"
                      min="0"
                      max={roverInformation?.photo_manifest?.max_sol}
                      // onKeyDown={handleSolKeyDown}
                      placeholder={`Enter Sol (0 - ${roverInformation?.photo_manifest?.max_sol})`}
                      className={`px-2 py-2 sm:py-2 sm:px-4 border rounded-xl bg-white/10 text-base transition-all backdrop-blur-sm
                      duration-300 focus:outline-none focus:border-teal-400 focus:ring-3 focus:ring-teal-400/30 disabled:opacity-50 
                      disabled:cursor-not-allowed ${
                        isDark
                          ? "placeholder:text-white/90 border-white/20 text-white"
                          : "placeholder:text-black/90 border-black/20 text-black"
                      }`}
                    />
                    <button
                      onClick={handleSolChange}
                      className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-xl text-white font-medium transition-colors"
                    >
                      Search Sol
                    </button>
                  </div>
                )}
              </>
            )}

            {roverName && sol && cameras.length === 0 && !loadingManifest && (
              <div className="text-center py-6">
                <p className="text-gray-400 mb-2">
                  No cameras available for this sol
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Try selecting a different sol
                </p>
              </div>
            )}

            {roverName && sol && !selectedCamera && cameras.length > 0 && (
              <div className="flex flex-col gap-3 sm:gap-2 w-[280px] sm:w-80 sm:min-w-48 mx-auto">
                <div className="relative">
                  <select
                    onChange={(e) => handleCameraSelect(e.target.value)}
                    className={`w-full px-2 py-2 sm:py-2 sm:px-4 border rounded-xl bg-white/10 text-base transition-all backdrop-blur-sm
                        duration-300 focus:outline-none focus:border-teal-400 focus:ring-3 focus:ring-teal-400/30 disabled:opacity-50 
                        disabled:cursor-not-allowed ${
                          isDark
                            ? "placeholder:text-white/90 border-white/20 text-white"
                            : "placeholder:text-black/90 border-black/20 text-black"
                        }`}
                  >
                    <option value="">Select a camera</option>
                    {cameras.map((camera) => (
                      <option
                        key={camera}
                        value={camera}
                        className={isDark ? "bg-gray-800" : "bg-white"}
                      >
                        {camera}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {(roverName || sol || selectedCamera) && (
              <div className="flex gap-2 mt-4">
                {selectedCamera && (
                  <button
                    onClick={() => setSelectedCamera("")}
                    className="px-3 py-1 text-sm bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    Change Camera
                  </button>
                )}
                {sol && (
                  <button
                    onClick={() => {
                      setSol("");
                      setCameras([]);
                      setSelectedCamera("");
                    }}
                    className="px-3 py-1 text-sm bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    Change Sol
                  </button>
                )}
                {roverName && (
                  <button
                    onClick={() => {
                      setRoverName();
                      setSol("");
                      setCameras([]);
                      setSelectedCamera("");
                    }}
                    className="px-3 py-1 text-sm bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    Change Rover
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="mb-12">
          {loadingPhotos && (
            <div className="px-4 sm:px-6 lg:px-0">
              {renderSmartGrid(Array(6).fill({}), true)}
            </div>
          )}

          {errorPhotos && (
            <div className="px-4 sm:px-6 lg:px-0">
              <div className="text-center py-12">
                <p className="text-red-400 mb-4">Failed to load photos</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {!loadingPhotos && !errorPhotos && photos?.photos?.length > 0 && (
            <div className="px-4 sm:px-6 lg:px-0">
              {renderSmartGrid(photos.photos)}
            </div>
          )}

          {!loadingPhotos &&
            !errorPhotos &&
            photos?.photos?.length === 0 &&
            selectedCamera && (
              <div className="px-4 sm:px-6 lg:px-0">
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">
                    No photos found for the selected sol and camera.
                  </p>
                  <p className="text-sm text-gray-500">
                    Try selecting a different sol or camera.
                  </p>
                </div>
              </div>
            )}
        </section>
      </div>
      <BackButton isDark={isDark} />
    </>
  );
}

export default BrowseBySolPage;

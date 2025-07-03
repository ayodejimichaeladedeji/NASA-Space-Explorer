import { useRef, useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import Banner from "../components/Banner";
import Shimmer from "../components/Shimmer";
import SmartGrid from "../components/SmartGrid";
import BackButton from "../components/BackButton";
import RoverTypeSelector from "../components/RoverTypeSelector";

import {
  useActiveRovers,
  useRoverManifest,
  usePhotosBySol,
} from "../hooks/useMarsRovers";

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
              <SmartGrid images={Array(6).fill({})} isShimmer={true} cardType="mars" />
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
              <SmartGrid images={photos.photos} cardType="mars" />
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

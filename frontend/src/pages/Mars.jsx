import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

import Banner from "../components/Banner";
import SmartGrid from "../components/SmartGrid";
import BackButton from "../components/BackButton";
import RoverTypeSelector from "../components/RoverTypeSelector";
import { useLatestPhotos, useActiveRovers } from "../hooks/useMarsRovers";

function MarsPage() {
  const { isDark } = useContext(ThemeContext);
  const [fetchOption, setFetchOption] = useState("latest_photos");
  const [selectedRover, setSelectedRover] = useState(null);

  const {
    data: roversData,
    loading: roversLoading,
    error: roversError,
  } = useActiveRovers();

  useEffect(() => {
    if (roversData && roversData.length > 0 && !selectedRover) {
      const randomIndex = Math.floor(Math.random() * roversData.length);
      const randomRover = roversData[randomIndex].name;
      setSelectedRover(randomRover);
    }
  }, [roversData, selectedRover]);

  const {
    data: latestPhotosData,
    loading: photosLoading,
    error: photosError,
  } = useLatestPhotos(selectedRover);

  const loading = roversLoading || photosLoading;
  const error = roversError || photosError;

  const rovers = roversData || [];
  const latest_photos = latestPhotosData || { latest_photos: [] };

  function handleRoverTypeChange(name) {
    setSelectedRover(name);
  }

  function handleFetchOptionChange(option) {
    setFetchOption(option);
  }

  return (
    <>
      <Banner
        mainText="Images from Active Rovers on Mars 🪐"
        subText={
          selectedRover ? `Latest Photos from the ${selectedRover} Rover` : ""
        }
      />
      <div className="relative z-10 max-w-6xl mx-auto -mt-10 sm:-mt-12">
        <section className="glass rounded-2xl p-5 sm:p-6.5">
          <div className="flex flex-col items-center mb-2">
            <div
              className="flex bg-white/10 rounded-xl p-1 backdrop-blur-sm border transition-all duration-300 mb-2
                    w-fit mx-auto"
              style={{
                borderColor: isDark
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.2)",
              }}
            >
              <button
                onClick={() => handleFetchOptionChange("latest_photos")}
                className={`px-2 py-1 sm:px-4 sm:py-2 rounded-xl font-medium transition-all duration-300 
                ${
                  fetchOption === "latest_photos"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
                    : "hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="sm:inline hidden">Latest Photos</span>
                  <span className="sm:hidden inline">Latest</span>
                </div>
              </button>
              <Link to="sol">
                <button
                  onClick={() => handleFetchOptionChange("sol")}
                  className={`px-2 py-1 sm:px-4 sm:py-2 rounded-xl font-medium transition-all duration-300 
                ${
                  fetchOption === "sol"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
                    : "hover:bg-white/10"
                }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="sm:inline hidden">Browse by Sol</span>
                    <span className="sm:hidden inline">Browse by Sol</span>
                  </div>
                </button>
              </Link>
              <Link to="earth_date">
                <button
                  onClick={() => handleFetchOptionChange("earth_date")}
                  className={`px-2 py-1 sm:px-4 sm:py-2 rounded-xl font-medium transition-all duration-300 
                ${
                  fetchOption === "earth_date"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
                    : "hover:bg-white/10"
                }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="sm:inline hidden">Browse by Date</span>
                    <span className="sm:hidden inline">Browse by Date</span>
                  </div>
                </button>
              </Link>
            </div>
            {rovers.length > 0 && selectedRover && (
              <RoverTypeSelector
                selectedRover={selectedRover}
                rovers={rovers}
                handleChange={handleRoverTypeChange}
              />
            )}
          </div>
        </section>

        <section className="mb-12">
          {loading && (
            <div className="px-4 sm:px-6 ">
              <SmartGrid
                images={Array(6).fill({})}
                isShimmer={true}
                cardType="mars"
              />
            </div>
          )}

          {error && (
            <div className="px-4 sm:px-6 ">
              <div className="glass rounded-2xl p-6 text-center">
                <p className="text-red-400 mb-2">
                  Failed to load Mars rover data
                </p>
                <p className="text-sm opacity-75">{error.message}</p>
              </div>
            </div>
          )}

          {!loading &&
            !error &&
            latest_photos.latest_photos &&
            latest_photos.latest_photos.length > 0 && (
              <div className="px-4 sm:px-6">
                <SmartGrid
                  images={latest_photos.latest_photos}
                  cardType="mars"
                />
              </div>
            )}

          {!loading &&
            !error &&
            (!latest_photos.latest_photos ||
              latest_photos.latest_photos.length === 0) && (
              <div className="px-4 sm:px-6 ">
                <div className="glass rounded-2xl p-6 text-center">
                  <p className="text-white/75">
                    No photos available at the moment
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

export default MarsPage;

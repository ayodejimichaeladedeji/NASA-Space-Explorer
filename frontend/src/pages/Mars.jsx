import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

import Banner from "../components/Banner";
import Shimmer from "../components/Shimmer";
import BackButton from "../components/BackButton";
import MarsImageCard from "../components/MarsImageCard";
import RoverTypeSelector from "../components/RoverTypeSelector";
import { useLatestPhotos, useActiveRovers } from "../hooks/useMarsRovers"; // Add your hook imports

function MarsPage() {
  const { isDark } = useContext(ThemeContext);
  const [fetchOption, setFetchOption] = useState("latest_photos");
  const [selectedRover, setSelectedRover] = useState(null);

  // First, get active rovers
  const { data: roversData, loading: roversLoading, error: roversError } = useActiveRovers();

  // Set random rover when rovers data loads
  useEffect(() => {
    if (roversData && roversData.length > 0 && !selectedRover) {
      const randomIndex = Math.floor(Math.random() * roversData.length);
      const randomRover = roversData[randomIndex].name;
      setSelectedRover(randomRover);
    }
  }, [roversData, selectedRover]);

  // Then use the selected rover to fetch photos
  const { data: latestPhotosData, loading: photosLoading, error: photosError } = useLatestPhotos(selectedRover);

  // Combine loading and error states
  const loading = roversLoading || photosLoading;
  const error = roversError || photosError;

  // Get the actual data or fallback to empty arrays
  const rovers = roversData || [];
  const latest_photos = latestPhotosData || { latest_photos: [] };

  function handleRoverTypeChange(name) {
    setSelectedRover(name);
  }

  function handleFetchOptionChange(option) {
    setFetchOption(option);
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
              key={isShimmer ? index : `${image.earth_date}-${index}`}
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
                key={`${image.earth_date}-${index}`}
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
        {/* All images in a consistent grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {images.map((image, index) =>
            isShimmer ? (
              <ShimmerCard key={index} index={index} />
            ) : (
              <MarsImageCard
                key={`${image.earth_date}-${index}`}
                image={image}
                index={index}
              />
            )
          )}
        </div>
      </div>
    );
  }

  // Shimmer card component that matches ImageCard dimensions
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
        {/* Image shimmer */}
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden">
          <Shimmer className="w-full h-full" />
        </div>

        {/* Content shimmer */}
        <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
          {/* Title shimmer */}
          <Shimmer className="h-6 sm:h-7 lg:h-8 w-3/4 rounded" />

          {/* Description shimmer lines */}
          <div className="space-y-2">
            <Shimmer className="h-4 w-full rounded" />
            <Shimmer className="h-4 w-5/6 rounded" />
            <Shimmer className="h-4 w-4/5 rounded" />
          </div>

          {/* Button shimmer */}
          <div className="pt-2">
            <Shimmer className="h-10 sm:h-12 w-32 sm:w-36 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Banner
        mainText="Images from Active Rovers on Mars 🪐"
        subText={selectedRover ? `Latest Photos from the ${selectedRover} Rover` : ""}
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
            <div className="px-4 sm:px-6 lg:px-0">
              {renderSmartGrid(Array(6).fill({}), true)}
            </div>
          )}
          
          {error && (
            <div className="px-4 sm:px-6 lg:px-0">
              <div className="glass rounded-2xl p-6 text-center">
                <p className="text-red-400 mb-2">Failed to load Mars rover data</p>
                <p className="text-sm opacity-75">{error.message}</p>
              </div>
            </div>
          )}

          {!loading && !error && latest_photos.latest_photos && latest_photos.latest_photos.length > 0 && (
            <div className="px-4 sm:px-6 lg:px-0">
              {renderSmartGrid(latest_photos.latest_photos)}
            </div>
          )}

          {!loading && !error && (!latest_photos.latest_photos || latest_photos.latest_photos.length === 0) && (
            <div className="px-4 sm:px-6 lg:px-0">
              <div className="glass rounded-2xl p-6 text-center">
                <p className="text-white/75">No photos available at the moment</p>
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
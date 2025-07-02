import { useApod } from "../hooks/useApod";
import { useMemo, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import Banner from "../components/Banner";
import Shimmer from "../components/Shimmer";
import DateInput from "../components/DateInput";
import ApodImageCard from "../components/ApodImageCard";
import BackButton from "../components/BackButton";
import DateTypeSelector from "../components/DateTypeSelector";

function ApodPage() {
  const { isDark } = useContext(ThemeContext);

  const [date, setDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [start_date, setStartDate] = useState("");
  const [dateMode, setDateMode] = useState("single");
  const [showDefault, setShowDefault] = useState(true);

  const { data, loading, error } = useApod({ date, start_date, end_date });

  function handleModeChange(mode) {
    setDateMode(mode);
    setDate("");
    setStartDate("");
    setEndDate("");
    // if (mode === "single") {
    //   setShowDefault(true);
    // }
  }

  const handleDateChange = (value) => {
    setDate(value);
    setShowDefault(false);
  };

  const handleStartDateChange = (value) => {
    setStartDate(value);
    setShowDefault(false);
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
    setShowDefault(false);
  };

  const normalizedData = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  }, [data]);

   const maxDate = useMemo(() => {
    if (normalizedData.length > 0) {
      return normalizedData[normalizedData.length - 1].date;
    }
    
    return undefined;
  }, [normalizedData]);

  console.log(maxDate);

  const hasSearched = date || (start_date && end_date);
  const shouldShowResults = hasSearched && !loading && !error;

  const bothDatesSelected = dateMode === "range" && start_date && end_date;
  const singleDateSelected = dateMode === "single";
  const shouldShowShimmer =
    loading && (bothDatesSelected || singleDateSelected);

  const getExpectedImageCount = () => {
    if (dateMode === "single") return 1;
    if (start_date && end_date) {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return Math.min(diffDays, 15);
    }
    return 6;
  };

  const renderSmartGrid = (images, isShimmer = false) => {
    const count = images.length;

    if (count === 1) {
      return (
        <div className="flex justify-center">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
            {isShimmer ? (
              <ShimmerCard index={0} />
            ) : (
              <ApodImageCard image={images[0]} index={0} />
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
              key={isShimmer ? index : `${image.date}-${index}`}
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
            >
              {isShimmer ? (
                <ShimmerCard index={index} />
              ) : (
                <ApodImageCard image={image} index={index} />
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
              <ApodImageCard
                key={`${image.date}-${index}`}
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
              <ApodImageCard
                key={`${image.date}-${index}`}
                image={image}
                index={index}
              />
            )
          )}
        </div>
      </div>
    );
  };

  const ShimmerCard = ({ index = 0 }) => {
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
  };

  return (
    <>
      <Banner
        mainText="Astronomy Picture of the Day 🌌"
        subText={
          dateMode === "single"
            ? "Perfect for exploring a specific day in cosmic history"
            : "Great for browsing multiple images across a time period"
        }
      />
      <div className="relative z-10 max-w-6xl mx-auto -mt-10 sm:-mt-12">
        <section className="glass rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col items-center mb-2">
            <DateTypeSelector mode={dateMode} onChange={handleModeChange} />
          </div>

          <div className="transition-all duration-500 ease-in-out">
            {dateMode === "single" ? (
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <DateInput
                    id="single-date"
                    name="Date"
                    date={date}
                    onChange={handleDateChange}
                    maxDate={maxDate}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-end max-w-2xl mx-auto">
                <DateInput
                  id="start-date"
                  name="Start Date"
                  date={start_date}
                  onChange={handleStartDateChange}
                  maxDate={maxDate}
                />
                <DateInput
                  id="end-date"
                  name="End Date"
                  date={end_date}
                  onChange={handleEndDateChange}
                  maxDate={maxDate}
                />
              </div>
            )}
          </div>
        </section>

        <section className="mb-12">
          {shouldShowShimmer && (
            <div className="px-4 sm:px-6 lg:px-0">
              {renderSmartGrid(
                Array.from({ length: getExpectedImageCount() }),
                true
              )}
            </div>
          )}

          {error && (
            <div className="px-4 sm:px-6 lg:px-0">
              <div className="bg-red-400/20 border border-red-400/50 rounded-xl p-5 text-center my-5">
                <p>Unable to fetch images. Please try again.</p>
              </div>
            </div>
          )}

          {showDefault && !loading && !error && normalizedData.length > 0 && (
            <div className="px-4 sm:px-6 lg:px-0">
              <div className="flex justify-center">
                <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
                  <ApodImageCard image={normalizedData[0]} />
                </div>
              </div>
            </div>
          )}

          {shouldShowResults && normalizedData.length === 0 && (
            <div className="px-4 sm:px-6 lg:px-0">
              <div className="text-center py-20 opacity-70">
                <h3 className="text-2xl font-semibold mb-2">No images found</h3>
                <p className="text-lg">
                  {dateMode === "single"
                    ? "Try selecting a different date"
                    : "Try selecting a different date range"}
                </p>
              </div>
            </div>
          )}

          {shouldShowResults && normalizedData.length > 0 && (
            <div className="px-4 sm:px-6 lg:px-0">
              {renderSmartGrid(normalizedData)}
            </div>
          )}
        </section>

        <BackButton isDark={isDark} />
      </div>
    </>
  );
}

export default ApodPage;

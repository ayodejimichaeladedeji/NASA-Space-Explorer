import { useApod } from "../hooks/useApod";
import { useMemo, useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import Banner from "../components/Banner";
import DateInput from "../components/DateInput";
import SmartGrid from "../components/SmartGrid";
import BackButton from "../components/BackButton";
import ApodImageCard from "../components/ApodImageCard";
import DateTypeSelector from "../components/DateTypeSelector";

function ApodPage() {
  const { isDark } = useContext(ThemeContext);

  const [date, setDate] = useState("");
  const [maxDate, setMaxDate] = useState();
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
    setShowDefault(true);
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

  const normalisedData = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  }, [data]);

  useEffect(() => {
    const latest = normalisedData[normalisedData.length - 1]?.date;
    if (!latest) return;

    if (!maxDate || latest > maxDate) {
      setMaxDate(latest);
    }
  }, [normalisedData, maxDate]);

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
            <div className="px-4 sm:px-6">
              <SmartGrid
                images={Array.from({ length: getExpectedImageCount() })}
                isShimmer={true}
                cardType="apod"
              />
            </div>
          )}

          {error && (
            <div className="px-4 sm:px-6">
              <div className="bg-red-400/20 border border-red-400/50 rounded-xl p-5 text-center my-5">
                <p>{error}</p>
              </div>
            </div>
          )}

          {showDefault && !loading && !error && normalisedData.length > 0 && (
            <div className="px-4 sm:px-6">
              <div className="flex justify-center">
                <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
                  <ApodImageCard image={normalisedData[0]} />
                </div>
              </div>
            </div>
          )}

          {shouldShowResults && normalisedData.length === 0 && (
            <div className="px-4 sm:px-6">
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

          {shouldShowResults && normalisedData.length > 0 && (
            <div className="px-4 sm:px-6">
              <SmartGrid images={normalisedData} cardType="apod" />
            </div>
          )}
        </section>

        <BackButton isDark={isDark} />
      </div>
    </>
  );
}

export default ApodPage;

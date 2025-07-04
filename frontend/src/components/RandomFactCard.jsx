import { useRandomFacts } from "../hooks/useGemini";
import { useApod } from "../hooks/useApod";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const today = new Date();
const end_date = today.toISOString().split("T")[0];

const initial_date = new Date();
initial_date.setDate(today.getDate() - 10);
const start_date = initial_date.toISOString().split("T")[0];

function RandomFactCard() {
  const {
    data: factsData,
    loading: factsLoading,
    error: factsError,
  } = useRandomFacts();
  const {
    data: apodData,
    loading: apodLoading,
    error: apodError,
  } = useApod({ start_date, end_date });

  const [currentFactIndex, setCurrentFactIndex] = useState(
    Math.floor(Math.random() * 100)
  );
  const [currentApodIndex, setCurrentApodIndex] = useState(0);

  useEffect(() => {
    if (!factsData?.facts || factsData.facts.length < 2) return;

    const interval = setInterval(() => {
      setCurrentFactIndex(
        (prevIndex) => (prevIndex + 1) % factsData.facts.length
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [factsData]);

  useEffect(() => {
    if (!apodData || apodData.length < 2) return;

    const interval = setInterval(() => {
      setCurrentApodIndex((prevIndex) => (prevIndex + 1) % apodData.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [apodData]);

  const currentFactItem = factsData?.facts?.[currentFactIndex];
  const currentApodItem = apodData?.[currentApodIndex];

  if (
    !factsData?.facts?.length ||
    !apodData?.length ||
    factsLoading ||
    apodLoading
  ) {
    return (
      <div className="lg:col-span-2 glass-effect rounded-xl overflow-hidden card-hover-effect cursor-pointer h-80">
        <Shimmer className="w-full h-full rounded-xl" />
      </div>
    );
  }

  if (factsError || apodError) {
    return (
      <div className="lg:col-span-2 glass-effect rounded-xl overflow-hidden h-80 flex items-center justify-center">
        <Shimmer className="w-full h-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 glass-effect relative rounded-xl overflow-hidden h-80">
      {currentApodItem?.url && (
        <img
          loading="lazy"
          src={currentApodItem.url}
          className="absolute inset-0 w-full h-full object-cover card-image-hover"
          alt={currentApodItem.title || "APOD Image"}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
      
      <div className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg opacity-90">
            Random Facts
          </h3>
          <div className="flex items-center gap-1.5 text-white/60 text-xs sm:text-sm">
            <span>Powered by</span>
            <span className="font-semibold text-white/80">Gemini</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-20 p-4 sm:p-6 w-full max-w-[90vw]">
        <p className="inline-block px-3 py-1 rounded-full text-xs sm:text-base font-semibold tracking-wider mb-3 bg-gradient-to-r from-red-400 to-cyan-400 text-white">
          {currentFactItem?.topic}
        </p>
        <p className="text-sm sm:text-lg lg:text-xl text-white opacity-90 leading-relaxed capitalize">
          {currentFactItem?.fact}
        </p>
      </div>
    </div>
  );
}

export default RandomFactCard;
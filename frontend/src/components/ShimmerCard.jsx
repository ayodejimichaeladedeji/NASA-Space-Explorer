import Shimmer from "./Shimmer.jsx";

function ShimmerCard({ index = 0, cardType }) {
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
          { cardType === "apod" && (
            <>
                <Shimmer className="h-4 w-full rounded" />
                <Shimmer className="h-4 w-full rounded" />
            </>
          )}
        </div>
        
        <div className="pt-2">
          <Shimmer className="h-10 sm:h-12 w-32 sm:w-36 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default ShimmerCard;
import { useApod } from "../hooks/useApod";
import FeatureCard from "./FeatureCard";
import Shimmer from "./Shimmer";

function ApodCard() {
  const { data, loading, error } = useApod({});

  if (loading) {
    return (
      <div className="glass-effect rounded-xl overflow-hidden card-hover-effect cursor-pointer h-80">
        <Shimmer className="w-full h-full rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-effect rounded-xl overflow-hidden h-80 flex items-center justify-center">
        <Shimmer className="w-full h-full rounded-xl" />
      </div>
    );
  }

  if (!data || data.media_type !== "image") return null;

  return (
    <div className="relative group cursor-pointer">
      <FeatureCard 
        imageUrl={data.url || data.hdurl} 
        title={data.title}
        className="transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-xl flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-800 shadow-lg">
          <span className="md:hidden">Tap to explore</span>
          <span className="hidden md:inline">Click to explore</span>
        </div>
      </div>
    </div>
  );
}

export default ApodCard;
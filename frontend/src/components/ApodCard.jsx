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
    <FeatureCard imageUrl={data.url || data.hdurl} title={data.title} cardUrl="/apod"/>
  );
}

export default ApodCard;

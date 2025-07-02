import { useActiveRovers, useLatestPhotos } from "../hooks/useMarsRovers";
import FeatureCarousel from "./FeatureCarousel";
import Shimmer from "./Shimmer";
import { useMemo, useEffect, useState } from "react";

function MarsCarousel() {  
  const [roverName, setRoverName] = useState();

  const { data: roversData, loading: loadingRovers, error: errorRovers } = useActiveRovers();

  useEffect(() => {
      if (roversData && roversData.length > 0 && !roverName) {
        const randomIndex = Math.floor(Math.random() * roversData.length);
        const randomRover = roversData[randomIndex].name;
        setRoverName(randomRover);
      }
    }, [roversData, roverName]);

  const { data, loading, error } = useLatestPhotos(roverName);

  const images = useMemo(() => data?.latest_photos?.map((photo) => ({
    imgUrl: photo.img_src
  })) || [], [data])

  const shouldShowShimmer = loading || loadingRovers || error || errorRovers;

  if (shouldShowShimmer) {
    return (
      <div className="glass-effect rounded-xl overflow-hidden card-hover-effect cursor-pointer h-80">
        <Shimmer className="w-full h-full rounded-xl" />
      </div>
    );
  }

  if (error || errorRovers) {
    return (
      <div className="glass-effect rounded-xl overflow-hidden card-hover-effect cursor-pointer h-80">
        <Shimmer className="w-full h-full rounded-xl" />
      </div>
    );
  }

  if (!images?.length) return null;

  return (
    <FeatureCarousel
      images={images}
      roverName={`Latest Images From The ${roverName} Rover`}
      carouselUrl="/mars-rovers"
    />
  );
}

export default MarsCarousel;

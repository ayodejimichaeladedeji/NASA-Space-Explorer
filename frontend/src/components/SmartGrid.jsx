import MarsImageCard from "./MarsImageCard";
import ApodImageCard from "./ApodImageCard";
import ShimmerCard from "./ShimmerCard.jsx";

function SmartGrid({ images, isShimmer = false, cardType }) {
  const count = images.length;

  const renderCard = (image, index) => {
    let CardComponent;

    switch (cardType) {
      case "apod":
        CardComponent = ApodImageCard;
        break;
      case "mars":
        CardComponent = MarsImageCard;
        break;
      default:
        CardComponent = MarsImageCard;
    }

    return <CardComponent image={image} index={index} />;
  };

  if (count === 1) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
          {isShimmer ? <ShimmerCard index={0} cardType={cardType} /> : renderCard(images[0], 0)}
        </div>
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className="flex flex-col lg:flex-row justify-center gap-4 sm:gap-6 lg:gap-8">
        {images.map((image, index) => (
          <div
            key={
              isShimmer ? index : `${image.id || image.title}-${index}`
            }
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
          >
            {isShimmer ? (
              <ShimmerCard index={index} cardType={cardType} />
            ) : (
              renderCard(image, index)
            )}
          </div>
        ))}
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {images.map((image, index) => (
          <div
            key={
              isShimmer ? index : `${image.id || image.title}-${index}`
            }
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
          >
            {isShimmer ? (
              <ShimmerCard index={index} cardType={cardType} />
            ) : (
              renderCard(image, index)
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {images.map((image, index) => (
          <div
            key={
              isShimmer ? index : `${image.id || image.title}-${index}`
            }
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
          >
            {isShimmer ? (
              <ShimmerCard index={index} cardType={cardType} />
            ) : (
              renderCard(image, index)
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SmartGrid;
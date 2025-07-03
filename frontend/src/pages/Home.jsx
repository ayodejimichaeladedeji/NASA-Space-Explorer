import { Link } from "react-router-dom";

import Banner from "../components/Banner";
import ApodCard from "../components/ApodCard";
import MarsCarousel from "../components/MarsCarousel";
import RandomFactCard from "../components/RandomFactCard";

function HomePage() {
  return (
    <div className="min-h-screen">
      <Banner
        mainText="Explore the Universe! 🌏"
        subText="
          Discover images from Astronomy Picture of the Day, Mars Rovers & more."
      />
      <main className="max-w-7xl mx-auto px-8 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <RandomFactCard />
          <Link to="/apod">
            <ApodCard />
          </Link>
          <Link to="/mars-rovers">
            <MarsCarousel />
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage;

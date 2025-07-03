import { Link } from "react-router-dom";

function HeroCard({ imageUrl, title, cardUrl }) {
  return (
    <div className="glass-effect relative rounded-xl overflow-hidden card-hover-effect cursor-pointer h-80">
      <Link to={cardUrl}>
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover card-image-hover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

        <div className="absolute bottom-0 left-0 z-20 p-6 w-full max-w-[90vw]">
          <div
            className="inline-block truncate px-3 py-1 rounded-full text-[13px] sm:text-sm font-semibold tracking-wider mb-2 bg-gradient-to-r from-red-400 to-cyan-400 text-white"
            style={{
              maxWidth: "100%",
            }}
            title={title}
          >
            {title}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HeroCard;

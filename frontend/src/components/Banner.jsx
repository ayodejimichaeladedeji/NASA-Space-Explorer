// import planetarySystemImg from '../assets/banner.png';

function Banner({mainText, subText}) {
  return (
    <section className="w-full py-2 px-2 flex flex-col items-center justify-center text-center gap-4">    
      <div className="max-w-3xl py-4">
        <h1 className="text-2xl sm:text-4xl mb-2">
          {mainText}
        </h1>
        <p className="text-1xs sm:text-base">
          {subText}
        </p>
      </div>
    </section>
  );
}

export default Banner;
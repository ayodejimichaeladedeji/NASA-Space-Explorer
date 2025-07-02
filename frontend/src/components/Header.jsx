function Header() {
  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl sm:text-sm md:text-2xl lg:text-3xl font-light tracking-wide" style={{ fontFamily: "'Merriweather', serif" }}>
            Bounce Insights - NASA
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Header;

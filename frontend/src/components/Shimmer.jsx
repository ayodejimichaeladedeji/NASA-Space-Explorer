import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Shimmer({ className }) {
  const { isDark } = useContext(ThemeContext);

  const baseColor = isDark ? "#2d2a2e" : "#dededf";
  const shimmerHighlight = isDark
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(255, 255, 255, 0.4)";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: baseColor }}
      aria-busy="true"
      aria-label="Loading"
    >
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerHighlight}, transparent)`,
        }}
      ></div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
}

export default Shimmer;
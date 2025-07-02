import ThemeMode from "./ThemeMode";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Layout() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const styles = {
    background: isDark
      ? "linear-gradient(135deg, #1e1e1e 0%, #2d2a2e 30%, #403e41 70%, #1e1e1e 100%)"
      : "linear-gradient(135deg, #fdfdfd 0%, #dededf 30%, #bebdc0 70%, #fdfdfd 100%)",
    color: isDark ? "#fcfcfa" : "#1e1e1e",
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    padding: 0,
    position: "relative",
  };

  return (
    <div style={styles} className="min-h-screen w-full overflow-x-hidden">
      <ThemeMode isDark={isDark} onToggleTheme={toggleTheme} />
      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

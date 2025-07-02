import "./App.css";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/Home";
import ApodPage from "./pages/Apod";
import MarsPage from "./pages/Mars";
import BrowseBySolPage from "./pages/BrowseBySol";
import BrowseByDatePage from "./pages/BrowseByDate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/apod", element: <ApodPage /> },
      { path: "/mars-rovers", element: <MarsPage /> },
      { path: "/mars-rovers/sol", element: <BrowseBySolPage /> },
      { path: "/mars-rovers/earth_date", element: <BrowseByDatePage /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

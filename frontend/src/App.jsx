import "./App.css";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/Home"));
const ApodPage = lazy(() => import("./pages/Apod"));
const MarsPage = lazy(() => import("./pages/Mars"));
const BrowseBySolPage = lazy(() => import("./pages/BrowseBySol"));
const BrowseByDatePage = lazy(() => import("./pages/BrowseByDate"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

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
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<p>Loading</p>}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

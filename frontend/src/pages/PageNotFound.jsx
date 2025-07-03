import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white border border-black text-black rounded-lg shadow-md text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default PageNotFound;
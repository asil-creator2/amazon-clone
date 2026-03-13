
import { NavLink } from "react-router"
import { FaExclamationTriangle } from "react-icons/fa"

const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="text-center bg-white p-10 rounded-xl shadow-lg max-w-md">

        <FaExclamationTriangle className="text-yellow-500 text-6xl mx-auto mb-4" />

        <h1 className="text-6xl font-bold text-gray-800 mb-2">
          404
        </h1>

        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <NavLink
          to="/"
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold"
        >
          Go Back Home
        </NavLink>

      </div>

    </div>
  )
}

export default Error404
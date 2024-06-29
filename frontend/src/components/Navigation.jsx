import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">
          <h1 className="text-2xl font-bold">HOTEL MANAGEMENT SYSTEM</h1>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
              Home
            </button>
          </Link>
          <Link to="/view">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
              View Booking
            </button>
          </Link>
          <Link to="/view">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
              Update Booking
            </button>
          </Link>
          <Link to="/uploadroom">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
              Add Room
            </button>
          </Link>
          <Link to="/contact">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
              Contact
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

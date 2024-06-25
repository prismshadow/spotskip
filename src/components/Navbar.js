import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center gap-4 container p-4">
      <div>
        <h1
          className="text-3xl text-secondary font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          SpotSkip
        </h1>
      </div>
      <nav>
        <ul className="flex items-center gap-4 md:gap-10">
          <li>
            <Link
              to="/"
              className="text-secondary text-md font-semibold transition-all duration-150 ease-in hover:text-primary hover:decoration-2 hover:underline hover:underline-offset-2 "
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-secondary text-md font-semibold transition-all duration-150 ease-in hover:text-primary hover:decoration-2 hover:underline hover:underline-offset-2 "
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-secondary text-md font-semibold transition-all duration-150 ease-in hover:text-primary hover:decoration-2 hover:underline hover:underline-offset-2 "
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/donate"
              className="text-secondary text-md font-semibold transition-all duration-150 ease-in hover:text-primary hover:decoration-2 hover:underline hover:underline-offset-2 "
            >
              Donate
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

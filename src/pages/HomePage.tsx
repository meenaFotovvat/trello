// src/pages/HomePage.tsx

import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Trello Clone</h1>
      <p className="text-lg mb-8">
        This is a simple project management tool where you can create, manage,
        and move tasks between columns.
      </p>
      <Link
        to="/dashboard"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Get Started
      </Link>
    </div>
  );
};

export default HomePage;

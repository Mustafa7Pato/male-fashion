import React from "react";
import { FaRegFrown } from "react-icons/fa";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="w-full h-[80vh] flex justify-center items-center bg-gray-100">
        <div className="text-center bg-white rounded-lg shadow-lg px-12 py-8 md:px-16 md:py-12 flex flex-col items-center justify-center max-w-2xl mx-4">
          <FaRegFrown className="text-5xl text-red-500 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! This page is lost.
          </h2>
          <p className="text-gray-700 text-xl text-center mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;

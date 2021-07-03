import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="h-12 bg-blue-900">
      <div className="container m-auto flex items-center h-full">
        <Link to="/">
          <p className="font-bold text-gray-50 text-2xl cursor-pointer">TMDB</p>
        </Link>
      </div>
    </div>
  );
};

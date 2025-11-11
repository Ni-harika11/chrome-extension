"use client";

import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) navigate(value);
  };

  return (
    <header className="flex justify-center space-x-8 bg-gray-900 text-white py-4 shadow-md">
      <div
        className="hover:text-yellow-400 cursor-pointer transition"
        onClick={() => navigate("/about")}
      >
        About Us
      </div>
      <div
        className="hover:text-yellow-400 cursor-pointer transition"
        onClick={() => navigate("/contact")}
      >
        Contact Us
      </div>
      <div className="hover:text-yellow-400 cursor-pointer transition">
        <select
          onChange={handleChange}
          className="bg-transparent text-white outline-none border-none cursor-pointer"
        >
          <option className="text-black" value="">More Features</option>
          <option className="text-black" value="/text">Voice to text</option>
          <option className="text-black" value="/voice">Text to voice</option>
          <option className="text-black" value="/image">Text to image</option>
        </select>
      </div>
    </header>
  );
};

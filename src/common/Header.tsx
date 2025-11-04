"use client";

import React from "react";

export const Header = () => {
  return (
    <header className="flex justify-center space-x-8 bg-gray-900 text-white py-4 shadow-md">
      <div className="hover:text-yellow-400 cursor-pointer transition">About Us</div>
      <div className="hover:text-yellow-400 cursor-pointer transition">Contact Us</div>
      <div className="hover:text-yellow-400 cursor-pointer transition">
        <select className="bg-transparent text-white outline-none border-none cursor-pointer">
          <option className="text-black">More Features</option>
          <option className="text-black">Voice to text</option>
          <option className="text-black">Text to voice</option>
          <option className="text-black">Text to image</option>
        </select>
      </div>

    </header>
  );
};

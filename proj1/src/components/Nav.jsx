import React from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { useContext } from "react";
import { useState } from "react";

const Nav = () => {
  const [products] = useContext(ProductContext);

  let categories =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  // console.log(categories);

  let distinct_categories = [...new Set(categories)];
  // console.log(distinct_categories);

  const color = () => {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.8)`;
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button (top-left, absolute) */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-zinc-100 border border-zinc-300 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <nav
        className={`
          bg-zinc-50 bg-opacity-3 p-6
          md:w-[15%] md:h-full w-[70%] h-screen
          fixed md:static top-0 left-0 z-40
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          border-r border-zinc-200 
        `}
      >
        <a
          href="/create"
          className="text-md p-2 flex justify-center m-4 border-2 border-zinc-300"
        >
          Add New Product
        </a>

        <hr className="mt-4 text-zinc-300" />
        <h1 className="text-xl mt-4 font-bold">Category Filter</h1>

        <ul className="ml-8 text-md mt-2 font-md">
          {distinct_categories.map((cat, idx) => (
            <li key={idx} className="mb-3 relative pl-5">
              <span
                style={{ background: color() }}
                className="absolute left-0 top-1/3 w-3 h-3 rounded-full"
              ></span>
              <Link to={`/?category=${cat}`}>{cat}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;

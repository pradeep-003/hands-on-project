import React from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { useContext } from "react";

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

  return (
    <nav className="w-[15%] h-full p-6 bg-zinc-50">
      <a
        href="/create"
        className="text-md p-2 flex justify-center m-4  border-2 border-zinc-300 "
      >
        Add New Product
      </a>
      <hr className=" mt-4 text-zinc-300" />
      <h1 className="text-xl mt-4 font-bold">Category Filter</h1>
      <ul className=" ml-8 text-md  mt-2 font-md">
        {distinct_categories.map((cat, idx) => (
          <li key={idx} className="mb-3  relative pl-5 ">
            <span
              style={{ background: color() }}
              className="absolute left-0 top-1/3 w-3 h-3 rounded-full "
            ></span>
            <Link to={`/?category=${cat}`}>{cat}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;

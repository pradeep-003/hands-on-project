import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
import { Link } from "react-router-dom";
import Create from "./components/Create";
import Edit from "./components/Edit";

const App = () => {
  const { search, pathname } = useLocation();

  // console.log("search:", search); blank
  // console.log("pathname:", pathname); /

  return (
    <div className="w-full h-screen relative flex">
      {(pathname !== "/" || search !== "") && (
        <Link
          to="/"
          className="absolute bg-pink-300 text-sm text-white px-3 py-1 left-2 top-2 active:bg-red-300 rounded-md"
        >
          Home
        </Link>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default App;

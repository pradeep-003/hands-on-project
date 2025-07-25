/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

// import styles from "./style.module.css";

const Home = () => {
  const [products] = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { search } = useLocation();
  // console.log(search);
  const category = decodeURI(search.split("=")[1]);
  // console.log("cat:", category);

  // const getProductCategory = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/category/${category}`);
  //     setFilteredProducts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // This effect runs every time products or category changes
  useEffect(() => {
    if (category !== "undefined") {
      // getProductCategory();
      setFilteredProducts(products.filter((p) => p.category === category));
    } else {
      // Wait until products are loaded before setting filteredProducts
      if (products.length > 0) {
        setFilteredProducts(products);
      }
    }
  }, [category, products]);

  return (
    <>
      <Nav />
      <div className="w-[75%] mx-auto h-full flex flex-wrap justify-center gap-4 overflow-x-hidden overflow-y-auto">
        {products.length === 0 ? (
          <Loading />
        ) : (
          filteredProducts.map((product, index) => {
            return (
              <Link
                to={`/details/${product.id}`}
                className="card m-2 shadow p-2 w-full sm:w-[45%] md:w-[30%] lg:w-[22%] xl:w-[18%] min-h-[35vh] border-2 rounded border-zinc-300 overflow-hidden"
                key={index}
              >
                <div
                  className="hover:scale-105 transition-transform duration-300 w-full h-[60%] bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${product.image})`,
                  }}
                ></div>
                <h1 className="mt-4 text-center text-sm md:text-base">
                  {product.title}
                </h1>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;

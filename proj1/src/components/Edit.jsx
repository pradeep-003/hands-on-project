import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";

const Edit = () => {
  const [products, setProducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    title: "",
    image: "",
    category: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const prod = products.find((p) => p.id == id);
    if (prod) setProduct(prod);
  }, [id, products]);

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 4 ||
      product.image.trim().length < 4 ||
      product.category.trim().length < 4 ||
      product.price.trim().length <= 1 ||
      product.description.trim().length < 4
    ) {
      return alert(
        "All fields must be at least 5 characters long (except Price)!"
      );
    }

    const index = products.findIndex((p) => p.id == id);
    if (index !== -1) {
      const updatedProducts = [...products];
      updatedProducts[index] = { ...product }; // updated product object
      setProducts(updatedProducts);
      // Optionally update localStorage if used
      // localStorage.setItem("products", JSON.stringify(updatedProducts));
    }

    navigate(-1); // go back
  };

  return (
    <form
      onSubmit={updateProductHandler}
      className="flex flex-col items-center px-4 py-8 sm:p-[5%] w-full min-h-screen"
    >
      <h1 className="mb-5 w-full sm:w-1/2 text-2xl sm:text-3xl font-bold text-center">
        Edit Product
      </h1>

      <input
        type="url"
        placeholder="Image URL"
        className="text-sm bg-zinc-100 rounded p-3 w-full sm:w-1/2 mb-3"
        onChange={changeHandler}
        name="image"
        value={product.image}
      />

      <input
        type="text"
        placeholder="Title"
        className="text-lg sm:text-2xl bg-zinc-100 rounded p-3 w-full sm:w-1/2 mb-3"
        name="title"
        onChange={changeHandler}
        value={product.title}
      />

      {/* Responsive side-by-side fields */}
      <div className="flex flex-col sm:flex-row w-full sm:w-1/2 mb-3 gap-3">
        <input
          type="text"
          placeholder="Category"
          className="text-lg sm:text-2xl bg-zinc-100 rounded p-3 w-full"
          name="category"
          onChange={changeHandler}
          value={product.category}
        />
        <input
          type="number"
          placeholder="Price"
          className="text-lg sm:text-2xl bg-zinc-100 rounded p-3 w-full"
          onChange={changeHandler}
          name="price"
          value={product.price}
        />
      </div>

      <textarea
        placeholder="Description"
        className="text-base sm:text-xl bg-zinc-100 rounded p-3 w-full sm:w-1/2 mb-3 resize-none"
        onChange={changeHandler}
        name="description"
        value={product.description}
        rows={6}
      />

      <button
        type="submit"
        className="text-lg sm:text-2xl bg-zinc-100 rounded p-3 w-full sm:w-1/2 mb-3 active:bg-zinc-50 cursor-pointer"
      >
        Update Product
      </button>
    </form>
  );
};

export default Edit;

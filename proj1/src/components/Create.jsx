import React, { useState, useContext } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [products, setProducts] = useContext(ProductContext);
  let nevigate = useNavigate();

  // const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 4 ||
      image.trim().length < 4 ||
      category.trim().length < 4 ||
      price.trim().length <= 1 ||
      description.trim().length < 4
    )
      return alert(
        "All fields must be at least 5 characters long Except Price !😡 "
      );

    const product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setProducts([...products, product]);
    // console.log(products);

    localStorage.setItem("products", JSON.stringify([...products, product]));

    setTitle("");
    setImage("");
    setCategory("");
    setPrice("");
    setDescription("");

    nevigate("/");
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className="mb-5 w-1/2 text-3xl font-bold">Add New Product</h1>

      <input
        type="url"
        placeholder="image url"
        className="text-sm bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="Title"
        className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <div className="flex w-1/2 mb-3 gap-3">
        <input
          type="text"
          placeholder="Category"
          className="text-2xl bg-zinc-100 rounded p-3 w-1/2"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <input
          type="number"
          placeholder="Price"
          className="text-2xl bg-zinc-100 rounded p-3 w-1/2 "
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        placeholder="Description"
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3 resize-none"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        rows={6}
      />
      <button
        type="submit"
        className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3 active:bg-zinc-50 cursor-pointer "
        onClick={() => {}}
      >
        Add Product
      </button>
    </form>
  );
};

export default Create;

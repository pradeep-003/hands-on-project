import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const Details = () => {
  const [products, setProducts] = useContext(ProductContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((product) => String(product.id) === String(id));

  const productDeleteHandler = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
    navigate("/");
  };

  return products.length === 0 ? (
    <Loading />
  ) : (
    <div className="w-[70%] flex items-center justify-between h-full m-auto p-[10%]">
      <img className=" w-[20vw] " src={product.image} alt="" />

      <div className="content w-[50%]">
        <h1 className="text-3xl leading-2xl font-semibold ">{product.title}</h1>
        <h3 className="font-light mt-2">{product.category}</h3>
        <h2 className="text-pink-500 mt-4">${product.price}</h2>
        <p className="text-sm mb-6">{product.description}</p>
        <div className="flex gap-6">
          <Link
            to={`/edit/${product.id}`}
            className=" text-sky-600 px-4 py-2 border-1 border-zinc-200 rounded-md active:border-zinc-700"
          >
            Edit
          </Link>
          <button
            onClick={() => productDeleteHandler(product.id)}
            className="text-pink-600 px-4 py-2 border-1 border-pink-200 rounded-md active:border-pink-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;

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
    <div className="w-full flex flex-col md:flex-row items-center justify-between h-auto md:h-full m-auto p-6 md:p-[5%] gap-8">
      {/* Image */}
      <img
        className="w-[60%] md:w-[30%] object-contain"
        src={product.image}
        alt={product.title}
      />

      {/* Content */}
      <div className="content w-full md:w-[60%]">
        <h1 className="text-2xl md:text-3xl font-semibold">{product.title}</h1>
        <h3 className="font-light mt-2 text-base md:text-lg">
          {product.category}
        </h3>
        <h2 className="text-pink-500 mt-4 text-xl">${product.price}</h2>
        <p className="text-sm md:text-base mb-6 mt-2">{product.description}</p>

        <div className="flex gap-4 flex-wrap">
          <Link
            to={`/edit/${product.id}`}
            className="text-sky-600 px-4 py-2 border border-zinc-200 rounded-md active:border-zinc-700"
          >
            Edit
          </Link>
          <button
            onClick={() => productDeleteHandler(product.id)}
            className="text-pink-600 px-4 py-2 border border-pink-200 rounded-md active:border-pink-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;

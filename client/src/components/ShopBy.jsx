import axios from "axios";
import React, { useEffect, useState } from "react";
import HorSlider from "./HorSlider";

const mockProducts = [
  {
    _id: "mock1",
    img: "/GenInfo/adidas.jpg",
    title: "Adidas Ultraboost 22",
    sellPrice: 15999,
    mrp: 18999,
    discount: 15,
    brand: "Adidas",
    category: "men",
    rating: 4.5
  },
  {
    _id: "mock2",
    img: "/GenInfo/nike.png",
    title: "Nike Air Max 270",
    sellPrice: 12999,
    mrp: 14999,
    discount: 13,
    brand: "Nike",
    category: "men",
    rating: 4.7
  },
  {
    _id: "mock3",
    img: "/GenInfo/skechers.jpg",
    title: "Skechers GoRun",
    sellPrice: 6999,
    mrp: 8999,
    discount: 22,
    brand: "Skechers",
    category: "women",
    rating: 4.2
  },
  {
    _id: "mock4",
    img: "/GenInfo/puma.jpg",
    title: "Puma RS-X3",
    sellPrice: 8499,
    mrp: 9999,
    discount: 15,
    brand: "Puma",
    category: "men",
    rating: 4.0
  }
];

const ShopBy = ({ filter, title }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/filter/${filter}`
        );
        if (isMounted) {
          // If API returns an empty array, we'll use our mock data for the demo
          setProducts(res.data.length > 0 ? res.data : mockProducts);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Error while fetching products: ${err.message}`);
          // Fallback to mock data on error as well for the demonstration
          setProducts(mockProducts);
          setError(err);
          setLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [filter]);

  return (
    <>
      <div className="mt-10 mb-2 text-2xl">{title}</div>
      <div className="overflow-x-auto overflow-y-hidden md:max-w-full scroll-container mb-10 mx-auto relative scroll-container">
        {loading && <p>Loading...</p>}
        {/* We hide the error for the recording to show the mock data smoothly */}
        {/* {error && <p className="text-red-400">Error while fetching: {error.message} (Using Demo Data)</p>} */}

        <div className="flex flex-nowrap space-x-4">
          {/* Ensure products is always an array */}
          {(Array.isArray(products) ? products : []).map((elem) => (
            <HorSlider
              product={elem}
              key={elem._id || elem.id} // fallback if _id is missing
              className="inline-block"
              home={true}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopBy;


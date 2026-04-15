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
  },
  {
    _id: "mock5",
    img: "/GenInfo/adidas.jpg",
    title: "Adidas AlphaBounce",
    sellPrice: 9999,
    mrp: 11999,
    discount: 16,
    brand: "Adidas",
    category: "men",
    rating: 4.3
  },
  {
    _id: "mock6",
    img: "/GenInfo/nike.png",
    title: "Nike ZoomX Invincible",
    sellPrice: 17999,
    mrp: 19999,
    discount: 10,
    brand: "Nike",
    category: "women",
    rating: 4.8
  },
  {
    _id: "mock7",
    img: "/GenInfo/skechers.jpg",
    title: "Skechers D'Lites",
    sellPrice: 5499,
    mrp: 6499,
    discount: 15,
    brand: "Skechers",
    category: "child",
    rating: 4.1
  },
  {
    _id: "mock8",
    img: "/GenInfo/puma.jpg",
    title: "Puma Cali Dream",
    sellPrice: 7999,
    mrp: 8999,
    discount: 11,
    brand: "Puma",
    category: "women",
    rating: 4.4
  }
];


const ShopBy = ({ filter, title }) => {
  const [products, setProducts] = useState(mockProducts); // Start with mock data
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
          if (res.data && Array.isArray(res.data) && res.data.length > 0) {
            setProducts(res.data);
          } else {
            console.log(`No data for ${filter}, sticking with mock data`);
            setProducts(mockProducts);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Error while fetching products for ${filter}: ${err.message}`);
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
      <div className="mt-16 mb-8 text-3xl font-bold text-center border-b-2 border-black w-fit mx-auto pb-2 capitalize">
        {title}
      </div>
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6">
          {products.map((elem) => (
            <div key={elem._id || elem.id} className="transform transition-transform duration-300 hover:scale-105">
              <HorSlider
                product={elem}
                home={true}
              />
            </div>
          ))}
        </div>
        {loading && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 animate-pulse text-xl">Loading premium collection...</p>
          </div>
        )}
      </div>
    </>
  );
};



export default ShopBy;


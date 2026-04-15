import React from "react";
import { Link } from "react-router-dom";
import { useWishList } from "../context/WishListContext";

const HorSlider = ({ product, home }) => {
    // Destructure the product properties
    const { img, title, sellPrice, mrp, discount, brand, category, rating } =
        product;

    // Destructure wishlist context methods and state
    const { toggleItemWishList, list } = useWishList();

    return (
        // Link to the product details page
        <div className="bg-white rounded-xl shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 w-[280px] h-[400px] overflow-hidden group">
            <div className="p-4 flex flex-col h-full relative">
                {/* Wishlist button */}
                <div className="absolute left-4 top-4 z-20">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleItemWishList(product._id);
                        }}
                        className="p-1 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-120 transition-transform"
                    >
                        {list.includes(product._id) ? "❤️" : "🤍"}
                    </button>
                </div>

                {/* Best Seller Badge */}
                {rating > 3.9 && (
                    <div className="absolute top-4 right-0 bg-black text-white text-[10px] uppercase tracking-widest px-3 py-1 font-bold rounded-l-lg z-20">
                        Top Rated
                    </div>
                )}

                {/* Product image container */}
                <div className="h-1/2 w-full flex items-center justify-center p-2 mb-4 overflow-hidden">
                    <Link to={`/product-details/${product._id}`} className="w-full h-full flex items-center justify-center">
                        <img 
                            src={img} 
                            alt={title} 
                            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" 
                        />
                    </Link>
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow">
                    <p className="text-gray-400 text-xs uppercase tracking-tighter mb-1">{brand}</p>
                    <p className="font-bold text-gray-800 text-sm line-clamp-1 mb-2 group-hover:text-blue-600 transition-colors uppercase">{title}</p>
                    
                    <div className="flex items-center gap-1 mb-3">
                        <div className="flex text-yellow-400 text-xs">
                           {"★".repeat(Math.floor(rating))}
                           {"☆".repeat(5 - Math.floor(rating))}
                        </div>
                        <span className="text-[10px] text-gray-400">({rating})</span>
                    </div>

                    {/* Price Section */}
                    <div className="mt-auto pt-2 border-t border-gray-50 flex items-baseline gap-2">
                        <p className="font-black text-xl text-black">
                            {`\u20B9 ${new Intl.NumberFormat("en-IN").format(sellPrice)}`}
                        </p>
                        <p className="line-through text-gray-400 text-xs">{mrp}</p>
                        <p className="text-green-600 text-[10px] font-bold">{discount}% OFF</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HorSlider;


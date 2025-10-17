import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
          scrollTo(0, 0);
        }}
        className="
          border border-gray-300/40 rounded-md bg-white 
          px-3 md:px-4 py-3 md:py-4
          min-w-[160px] max-w-[160px] md:min-w-56 md:max-w-56
          w-full transition-transform duration-200
        "
      >
        {/* Product Image */}
        <div className="group cursor-pointer flex items-center justify-center px-1 md:px-2">
          <img
            className="group-hover:scale-105 transition max-w-[90px] md:max-w-36"
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        {/* Product Info */}
        <div className="text-gray-500/60 text-[12px] md:text-sm mt-2 md:mt-3">
          <p>{product.category}</p>

          <p className="text-gray-700 font-medium text-[13px] md:text-lg truncate w-full">
            {product.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-[2px] mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="w-[11px] md:w-3.5"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                />
              ))}
            <p className="text-[11px] md:text-sm">(4)</p>
          </div>

          {/* Price & Cart */}
          <div className="flex items-end justify-between mt-3 md:mt-4">
            <p className="text-[13px] md:text-xl font-medium text-primary">
              {currency}
              {product.offerPrice}{" "}
              <span className="text-gray-500/60 text-[10px] md:text-sm line-through">
                {currency}
                {product.price}
              </span>
            </p>

            <div
              onClick={(e) => e.stopPropagation()}
              className="text-primary"
            >
              {!cartItems[product._id] ? (
                <button
                  className="
                    flex items-center justify-center gap-1
                    bg-primary/10 border border-primary/40
                    w-[64px] md:w-[80px] h-[30px] md:h-[34px]
                    rounded cursor-pointer text-[11px] md:text-sm
                  "
                  onClick={() => addToCart(product._id)}
                >
                  <img
                    src={assets.cart_icon}
                    alt="cart_icon"
                    className="w-[11px] md:w-[14px]"
                  />
                  Add
                </button>
              ) : (
                <div
                  className="
                    flex items-center justify-center gap-2
                    bg-primary/25 rounded select-none
                    w-[68px] md:w-20 h-[30px] md:h-[34px]
                    text-[11px] md:text-sm
                  "
                >
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="cursor-pointer px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-4 text-center">{cartItems[product._id]}</span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="cursor-pointer px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;

"use client"

import { useState } from "react"
import WebHeader from "../ShoppingCartHeader"

export default function AddToCart({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    setIsAdding(false)
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const totalPrice = (product.price * quantity).toFixed(2)

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-sm shadow-lg relative">
      {/* Success Message */}
      {showSuccess && (
        <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-4 py-2 rounded-md text-sm font-semibold z-10 animate-fade-in">
          Added to cart!
        </div>
      )}

      {/* Product Info */}
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-700 mb-2 font-serif">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{product.description}</p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-base font-semibold text-gray-700">Quantity:</span>

        <div className="flex items-center bg-red-50 rounded-lg p-1">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className={`w-8 h-8 rounded-md border-none text-lg font-semibold flex items-center justify-center transition-colors ${
              quantity <= 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-[#eb0505] text-white cursor-pointer hover:bg-red-700"
            }`}
          >
            -
          </button>

          <span className="min-w-10 text-center text-base font-semibold text-gray-700">{quantity}</span>

          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 99}
            className={`w-8 h-8 rounded-md border-none text-lg font-semibold flex items-center justify-center transition-colors ${
              quantity >= 99
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-[#eb0505] text-white cursor-pointer hover:bg-red-700"
            }`}
          >
            +
          </button>
        </div>
      </div>

      {/* Price Display */}
      <div className="flex justify-between items-center mb-6 p-4 bg-red-50 rounded-lg">
        <span className="text-base text-gray-700">Total Price:</span>
        <span className="text-2xl font-bold text-[#eb0505] font-serif">${totalPrice}</span>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`w-full p-4 border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
          isAdding
            ? "bg-red-400 text-white cursor-not-allowed"
            : "bg-[#eb0505] text-white hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-xl"
        }`}
      >
        {isAdding ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Adding...
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </>
        )}
      </button>
    </div>
  )
}

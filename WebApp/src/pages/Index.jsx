"use client"

import { Search, ShoppingCart, Star, Plus, Minus, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { useState } from "react"
import Temp from "../Header.jsx";
import WebHeader from "../WebHeader.jsx";
import WebFooter from "../Footer.jsx";

export default function Dashboard() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState("Standard")
  const [selectedSize, setSelectedSize] = useState("Universal")
  const [activeTab, setActiveTab] = useState("description")
  const [isWishlisted, setIsWishlisted] = useState(false)

  const productImages = [
    "Sample Image",
    "Sample Image",
    "Sample Image",
    "Sample Image",
  ]

  const variants = [
    { name: "Standard", price: 89.99, stock: 15 },
    { name: "Premium", price: 129.99, stock: 8 },
    { name: "Performance", price: 179.99, stock: 5 },
  ]

  const sizes = ["Universal", "Front Only", "Rear Only", "Complete Set"]

  const relatedProducts = [
    { name: "Brembo Brake Disc 3402", price: 159.99, image: "Sample Image", rating: 4.8 },
    { name: "Bosch Oil Filter", price: 24.99, image: "Sample Image", rating: 4.6 },
    { name: "NGK Spark Plugs Set", price: 45.99, image: "Sample Image", rating: 4.9 },
    { name: "Castrol Engine Oil", price: 39.99, image: "Sample Image", rating: 4.7 },
  ]

  const currentVariant = variants.find((v) => v.name === selectedVariant) || variants[0]

  const incrementQuantity = () => {
    if (quantity < currentVariant.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-red-100">
      <WebHeader />
      {/* Featured Product */}
      <div className="max-w-6xl mx-auto px-4  ">
        <div className="flex items-center-safe w-full h-[40px]">
          <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1">
              <li>
                <a href="#" className="text-red-500 text-[16px] p-[4px]">Brand</a>
              </li>
              <li className="text-black text-lg"> ➢ </li>
              <li>
                <a href="#" className="text-red-500 text-[16px] p-[4px]">Brake Pad</a>
              </li>
              <li className="text-black text-lg"> ➢ </li>
              <li>
                <a href="#" className="text-black text-[16px] p-[4px]">Product Name</a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-2 rounded-lg shadow-sm ">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg border-2 border-gray-200">
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                {productImages[selectedImage]}
              </div>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`absolute top-4 right-4 p-2 rounded-full ${isWishlisted ? "bg-[#eb0505] text-white" : "bg-white text-gray-600"} hover:scale-110 transition-all`}
              >
                <Heart className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${selectedImage === index ? "border-[#eb0505]" : "border-gray-200"}`}
                >
                  <div className="w-full h-20 bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                    {image}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Brembo Brake Pad 3402-Hilux, Fortuner, Raptor</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-gray-600">(4.8) • 2,847 reviews</span>
                </div>
                <span className="text-[#eb0505] font-medium">Sold 4000+</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-[#eb0505]">${currentVariant.price}</span>
                <span className="text-lg text-gray-500 line-through">$199.99</span>
                <span className="bg-[#eb0505] text-white px-2 py-1 rounded text-sm font-medium">35% OFF</span>
              </div>
              <p className="text-green-600 font-medium">✓ In Stock ({currentVariant.stock} available)</p>
            </div>

            {/* Variants */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Variant:</h3>
                <div className="flex space-x-2">
                  {variants.map((variant) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariant(variant.name)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                        selectedVariant === variant.name
                          ? "border-[#eb0505] bg-[#eb0505] text-white"
                          : "border-gray-300 text-gray-700 hover:border-[#eb0505]"
                      }`}
                    >
                      {variant.name} - ${variant.price}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Size:</h3>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#eb0505]"
                >
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Quantity:</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= currentVariant.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-600">Max: {currentVariant.stock} pieces</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-[#eb0505] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#d10404] transition-colors flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Buy Now
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Share2 className="w-5 h-5" />
                <span>Share Product</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-[#eb0505]" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-[#eb0505]" />
                <span>2 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <RotateCcw className="w-5 h-5 text-[#eb0505]" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-sm ">
          <div className="">
            <nav className="flex space-x-8">
              {["description", "specifications", "reviews", "shipping"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? "border-[#eb0505] text-[#eb0505]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8 bg-white rounded-lg ">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="text-gray-700 mb-4">
                  The Brembo Brake Pad 3402 is engineered for superior stopping power and durability. Specifically
                  designed for Toyota Hilux, Fortuner, and Ford Raptor vehicles, these brake pads deliver exceptional
                  performance in all driving conditions.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Premium friction material for consistent braking performance</li>
                  <li>Low dust formula keeps wheels cleaner longer</li>
                  <li>Noise-dampening shims reduce brake squeal</li>
                  <li>Heat-resistant compound prevents brake fade</li>
                  <li>Direct OEM replacement - no modifications required</li>
                </ul>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Brand:</span>
                      <span>Brembo</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Part Number:</span>
                      <span>P83154</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Material:</span>
                      <span>Semi-Metallic</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Position:</span>
                      <span>Front & Rear</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Weight:</span>
                      <span>2.5 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Temperature Range:</span>
                      <span>-40°C to 400°C</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Warranty:</span>
                      <span>2 Years</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Country of Origin:</span>
                      <span>Italy</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-6">
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-medium">John D.</span>
                        <span className="text-gray-500 text-sm">Verified Purchase</span>
                      </div>
                      <p className="text-gray-700">
                        Excellent brake pads! Much better stopping power than the original ones. Installation was
                        straightforward and they've been performing great for 6 months now.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Free Standard Shipping</h4>
                    <p className="text-gray-700">Delivery in 3-5 business days for orders over $50</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Express Shipping</h4>
                    <p className="text-gray-700">Next day delivery available for $15.99</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">International Shipping</h4>
                    <p className="text-gray-700">Available to most countries. Delivery in 7-14 business days</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-[#eb0505] mb-8">Related Products</h3>
          <div className="grid grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <div key={index} className="border border-[#eb0505] rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
                <div className="w-full h-32 bg-gray-200 rounded mb-3 flex items-center justify-center text-sm text-gray-600">
                  {product.image}
                </div>
                <h4 className="font-medium text-sm mb-2">{product.name}</h4>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
                </div>
                <p className="text-[#eb0505] font-bold">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <WebFooter />
    </div>
  )
}
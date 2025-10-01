"use client"
import { useState } from "react"
import ShoppingCartHeader from "../ShoppingCartHeader"

export default function CartDemo() {
  const [selectedItems, setSelectedItems] = useState({
    1: true,
    2: true,
    3: false,
    4: true,
  })

  const [quantities, setQuantities] = useState({
    1: 1,
    2: 1,
    3: 1,
    4: 1,
  })

  const products = [
    {
      id: 1,
      name: "Delightful Honey - Brown Contact Lenses",
      brand: "Canadian Footwear",
      color: "Blue, Brown",
      size: "6",
      price: 652,
      originalPrice: 652,
      discount: "20% OFF",
      image: "/brown-contact-lenses.jpg",
    },
    {
      id: 2,
      name: "Acton Propulsion",
      brand: "Canadian Footwear",
      color: "Blue, Brown",
      size: "6",
      price: 652,
      originalPrice: 652,
      discount: "20% OFF",
      image: "/blue-brown-boots.jpg",
    },
    {
      id: 3,
      name: "Kodiak Trek",
      brand: "Canadian Footwear",
      color: "Blue, Brown",
      size: "6",
      price: 652,
      originalPrice: 652,
      discount: "20% OFF",
      image: "/kodiak-trek-boots.jpg",
    },
    {
      id: 4,
      name: "Terra Crossbow",
      brand: "Canadian Footwear",
      color: "Blue, Brown",
      size: "6",
      price: 652,
      originalPrice: 652,
      discount: "20% OFF",
      image: "/terra-crossbow-boots.jpg",
    },
  ]

  const toggleSelection = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const updateQuantity = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] + change),
    }))
  }

  const selectedTotal = products
    .filter((product) => selectedItems[product.id])
    .reduce((sum, product) => sum + product.price * quantities[product.id], 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-red-100">
      <ShoppingCartHeader />
      <div className="max-w-7xl mx-auto px-4 pb-8 mt-[20px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">My Cart</h1>

            <div className="bg-white rounded-lg">
              <div className="p-4 border-b">
                <h2 className="font-semibold">My Cart ({Object.values(selectedItems).filter(Boolean).length})</h2>
              </div>

              <div className="max-h-full overflow-y-auto p-6">
                {products.map((product) => (
                  <div key={product.id} className="p-4 border-b last:border-b-0 flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedItems[product.id]}
                      onChange={() => toggleSelection(product.id)}
                      className="w-4 h-4 text-[#eb0505] rounded"
                    />

                    <div
                      className="w-20 h-20 object-cover rounded"
                    >
                      <span> sample Image</span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.brand}</p>
                      <p className="text-sm text-gray-500">
                        Color: {product.color} | Size: {product.size}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 line-through">${product.originalPrice}</span>
                          <span className="font-bold">${product.price}</span>
                          <span className="text-[#eb0505] text-sm">{product.discount}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="w-8 h-8 bg-black text-white rounded flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{quantities[product.id]}</span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="w-8 h-8 bg-black text-white rounded flex items-center justify-center"
                          >
                            +
                          </button>

                          <button className="text-gray-400 text-sm ml-4">✕ Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Fixed Order Summary */}
          <div className="lg:sticky lg:top-4 lg:h-fit">
            {/* Coupons */}
            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-3">Coupons</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Coupon code" className="flex-1 px-3 py-2 border rounded" />
                <button className="bg-black text-white px-4 py-2 rounded text-sm">APPLY NOW</button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-4">Your Order</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({Object.values(selectedItems).filter(Boolean).length} items)</span>
                  <span>${selectedTotal.toFixed(2)}</span>
                </div>


                <div className="border-t pt-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Pick Up</span>
                    <select className="text-sm">
                      <option>Asap</option>
                    </select>
                  </div>

                 
                </div>

                <div className="flex justify-between text-sm">
                  <span>Delivery Fees</span>
                  <span>$1.50</span>
                </div>

            

            

                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total Payable</span>
                  <span>${(selectedTotal + 7.99 + 4.0 + 1.5 + 7.0 - 8.0).toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-orange-500 text-white py-3 rounded font-semibold">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

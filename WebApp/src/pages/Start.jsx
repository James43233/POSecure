"use client"

import { Search, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"  
import Header from "../Header.jsx";
import bremboLogo from "../assets/brembo-logo.png";
import boschLogo from "../assets/bosch-logo.png";
import ngkLogo from "../assets/ngk-logo.png";
import densoLogo from "../assets/denso-logo.png";
import mobil1Logo from "../assets/mobil-1-logo.png";
import castrolLogo from "../assets/castrol-logo.png";
import michelinLogo from "../assets/michelin-logo.png";
import bridgestoneLogo from "../assets/bridgestone-logo.png";
import continentalLogo from "../assets/continental-logo.png";
import acdelcoLogo from "../assets/acdelco-logo.png";
import mannFilterLogo from "../assets/mann-filter-logo.png";
import kybLogo from "../assets/kyb-logo.png";
import automotiveBanner from "../assets/automotive-banner.png";
import brakePadsBanner from "../assets/brake-pads-promotion-banner.png";
import oilFiltersBanner from "../assets/oil-filters-sale-banner.png";
import Logo from "../assets/Arrival.png";
import WebHeader from "../WebHeader.jsx";
import Footer from "../Footer.jsx";


export default function ToyozuEcommerce() {
  const categories = [
    { name: "Brake Pads", icon: "🔧" },
    { name: "Oil Filters", icon: "🛢️" },
    { name: "Spark Plugs", icon: "⚡" },
    { name: "Tires", icon: "🛞" },
    { name: "Batteries", icon: "🔋" },
    { name: "Air Filters", icon: "💨" },
    { name: "Belts & Hoses", icon: "🔗" },
    { name: "Suspension", icon: "🚗" },
    { name: "Exhaust", icon: "💨" },
    { name: "Engine Parts", icon: "🔩" },
    { name: "Transmission", icon: "⚙️" },
    { name: "Cooling System", icon: "❄️" },
    { name: "Fuel System", icon: "⛽" },
    { name: "Electrical", icon: "🔌" },
    { name: "Body Parts", icon: "🚪" },
    { name: "Interior", icon: "🪑" },
    { name: "Lighting", icon: "💡" },
    { name: "Tools", icon: "🔨" },
  ]

  const brands = [
    { name: "Brembo", logo: bremboLogo },
    { name: "Bosch", logo: boschLogo },
    { name: "NGK", logo: ngkLogo },
    { name: "Denso", logo: densoLogo },
    { name: "Mobil 1", logo: mobil1Logo },
    { name: "Castrol", logo: castrolLogo },
    { name: "Michelin", logo: michelinLogo },
    { name: "Bridgestone", logo: bridgestoneLogo },
    { name: "Continental", logo: continentalLogo },
    { name: "ACDelco", logo: acdelcoLogo },
    { name: "Mann Filter", logo: mannFilterLogo },
    { name: "KYB", logo: kybLogo },
  ];

  const slideImages = [
    automotiveBanner,
    brakePadsBanner,
    oilFiltersBanner,
  ];

  const [currentSlide, setCurrentSlide] = useState(0)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [currentBrandSlide, setCurrentBrandSlide] = useState(0)
  const displayedCategories = showAllCategories ? categories : categories.slice(0, 10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slideImages.length])

  useEffect(() => {
    const brandTimer = setInterval(() => {
      setCurrentBrandSlide((prev) => (prev + 1) % Math.ceil(brands.length / 6))
    }, 3000)
    return () => clearInterval(brandTimer)
  }, [brands.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length)
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-red-100">
      <WebHeader />
      {/* Hero Section */}
      <section
        className="py-16 px-4 relative overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200"
        style={{
          backgroundImage: `url('/placeholder-8h7yx.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "soft-light",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex-1">
            <h1 className="text-3xl text-[#eb0505] font-bold  mb-6 drop-shadow-sm">
              BEST SELLER DEALS BUNDLES
              <br />
              GRAB NOW!!
            </h1>
            <button className="bg-[#eb0505] text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-primary-dark transition-colors">
              Best Seller!!
            </button>
          </div>

          <div className="flex-1 text-center relative">
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slideImages.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`Automotive Promotion ${index + 1}`}
                    className="w-full h-64 object-cover flex-shrink-0"
                  />
                ))}
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2 relative z-10">
          {slideImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>  
          <section className=" py-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#eb0505] mb-2">Find Parts for Your Vehicle</h2>
          <p className="text-gray-600">Select your car details to find compatible parts</p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#eb0505] to-red-400 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className=" p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Year Model Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Year Model
              </label>
              <div className="relative">
                <select className="w-full border-2 border-gray-200 rounded-lg p-3 bg-white text-gray-700 focus:border-[#eb0505] focus:ring-2 focus:ring-red-100 transition-all duration-200 appearance-none cursor-pointer hover:border-red-300">
                  <option value="" className="text-gray-500">Select Year Model</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-[#eb0505]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Car Brand Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Car Brand
              </label>
              <div className="relative">
                <select className="w-full border-2 border-gray-200 rounded-lg p-3 bg-white text-gray-700 focus:border-[#eb0505] focus:ring-2 focus:ring-red-100 transition-all duration-200 appearance-none cursor-pointer hover:border-red-300">
                  <option value="" className="text-gray-500">Select Brand</option>
                  <option value="toyota">Toyota</option>
                  <option value="ford">Ford</option>
                  <option value="honda">Honda</option>
                  <option value="nissan">Nissan</option>
                  <option value="mazda">Mazda</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-[#eb0505]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Car Model Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Car Model
              </label>
              <div className="relative">
                <select className="w-full border-2 border-gray-200 rounded-lg p-3 bg-white text-gray-700 focus:border-[#eb0505] focus:ring-2 focus:ring-red-100 transition-all duration-200 appearance-none cursor-pointer hover:border-red-300">
                  <option value="" className="text-gray-500">Select Model</option>
                  <option value="hilux">Hilux</option>
                  <option value="fortuner">Fortuner</option>
                  <option value="raptor">Raptor</option>
                  <option value="ranger">Ranger</option>
                  <option value="civic">Civic</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-[#eb0505]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Car Variants Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Car Variants
              </label>
              <div className="relative">
                <select className="w-full border-2 border-gray-200 rounded-lg p-3 bg-white text-gray-700 focus:border-[#eb0505] focus:ring-2 focus:ring-red-100 transition-all duration-200 appearance-none cursor-pointer hover:border-red-300">
                  <option value="" className="text-gray-500">Select Variant</option>
                  <option value="2.4L">2.4L Manual</option>
                  <option value="2.8L">2.8L Automatic</option>
                  <option value="3.0L">3.0L Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-[#eb0505]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Search Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-gradient-to-r from-[#eb0505] to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span>Find Compatible Parts</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Can't find your vehicle? <a href="#" className="text-[#eb0505] hover:text-red-600 font-medium">Contact our support team</a>
            </p>
          </div>
        </div>
        {/* Quick Stats */}
      </div>
    </section>  

      {/* Categories Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#eb0505]">CATEGORIES</h2>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {displayedCategories.map((category, i) => (
              <button
                key={i}
                className="bg-[#eb0505] text-white px-4 py-3 rounded-lg flex items-center space-x-2 font-medium hover:bg-[#d10404] hover:scale-105 transition-all duration-200 hover:shadow-lg transform"
                style={{
                  animation: `fadeInUp 0.4s ease-out ${i * 0.05}s both`,
                }}
              >
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-xs">
                  {category.icon}
                </div>
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="text-[#eb0505] font-medium hover:underline transition-all duration-150 hover:scale-105"
            >
              {showAllCategories ? "Show Less" : "More"}
            </button>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="py-12 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#eb0505] text-center mb-8">TRUSTED BRANDS</h2>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentBrandSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(brands.length / 6) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-6 gap-6">
                    {brands.slice(slideIndex * 6, (slideIndex + 1) * 6).map((brand, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
                        style={{
                          animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                        }}
                      >
                        <img
                          src={brand.logo || "/placeholder.svg"}
                          alt={brand.name}
                          className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Brand navigation dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(brands.length / 6) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBrandSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentBrandSlide ? "bg-[#eb0505]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#eb0505] text-center mb-8">Discovery</h2>

          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border border-[#eb0505] rounded-lg p-4">
                <div className="w-full h-32 bg-[#d9d9d9] rounded mb-3"></div>
                <h3 className="text-sm font-medium text-black mb-2">Brembo Brake Pad 3402-Hilux, Fortuner, Raptor</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-[#ffcb45]">{"★".repeat(5)}</div>
                </div>
                <p className="text-[#eb0505] text-sm font-medium">Sold 4000+</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-[#eb0505] text-white px-8 py-2 rounded-full font-semibold">More</button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

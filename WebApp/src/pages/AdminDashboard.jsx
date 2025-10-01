"use client"

import { useState } from "react"
import { getCurrentUser, hasPermission, PERMISSIONS } from "../lib/auth"
import WebHeader from "../WebHeader"

export default function AdminDashboard() {
  const [currentUser] = useState(getCurrentUser())
  const [activeSection, setActiveSection] = useState("overview")

  const navigationItems = [
    {
      id: "overview",
      label: "Overview",
      icon: "📊",
      permission: PERMISSIONS.VIEW_ANALYTICS,
    },
    {
      id: "orders",
      label: "Order Management",
      icon: "📦",
      permission: PERMISSIONS.VIEW_ORDERS,
    },
    {
      id: "products",
      label: "Product Management",
      icon: "🔧",
      permission: PERMISSIONS.MANAGE_PRODUCTS,
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: "📋",
      permission: PERMISSIONS.MANAGE_INVENTORY,
    },
    {
      id: "employees",
      label: "Employee Management",
      icon: "👥",
      permission: PERMISSIONS.MANAGE_EMPLOYEES,
    },
    {
      id: "profile",
      label: "Profile Settings",
      icon: "⚙️",
      permission: PERMISSIONS.EDIT_PROFILE,
    },
  ]

  const filteredNavigation = navigationItems.filter((item) => hasPermission(currentUser.role, item.permission))

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <WebHeader currentUser={currentUser} />
      

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            {filteredNavigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === item.id ? "bg-red-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeSection === "overview" && hasPermission(currentUser.role, PERMISSIONS.VIEW_ANALYTICS) && (
            <OverviewSection />
          )}
          {activeSection === "orders" && hasPermission(currentUser.role, PERMISSIONS.VIEW_ORDERS) && <OrdersSection />}
          {activeSection === "products" && hasPermission(currentUser.role, PERMISSIONS.MANAGE_PRODUCTS) && (
            <ProductsSection />
          )}
          {activeSection === "inventory" && hasPermission(currentUser.role, PERMISSIONS.MANAGE_INVENTORY) && (
            <InventorySection />
          )}
          {activeSection === "employees" && hasPermission(currentUser.role, PERMISSIONS.MANAGE_EMPLOYEES) && (
            <EmployeesSection />
          )}
          {activeSection === "profile" && hasPermission(currentUser.role, PERMISSIONS.EDIT_PROFILE) && (
            <ProfileSection currentUser={currentUser} />
          )}
        </main>
      </div>
    </div>
  )
}

// Overview Section Component
function OverviewSection() {
  const stats = [
    { label: "Total Revenue", value: "$124,563", change: "+12.5%", positive: true },
    { label: "Total Orders", value: "1,247", change: "+8.2%", positive: true },
    { label: "Active Products", value: "342", change: "+5.1%", positive: true },
    { label: "Low Stock Items", value: "23", change: "-15.3%", positive: true },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            "New order #1247 received - $89.99",
            'Product "Brake Pads Premium" added to inventory',
            "Low stock alert: Oil Filter Standard (5 remaining)",
            "Employee Mike Employee updated product pricing",
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span className="text-gray-900">{activity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Orders Section Component
function OrdersSection() {
  const orders = [
    { id: "#1247", customer: "John Doe", total: "$89.99", status: "Processing", date: "2024-01-15" },
    { id: "#1246", customer: "Jane Smith", total: "$156.50", status: "Shipped", date: "2024-01-14" },
    { id: "#1245", customer: "Bob Johnson", total: "$234.75", status: "Delivered", date: "2024-01-13" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Products Section Component
function ProductsSection() {
  const [products, setProducts] = useState([
    { id: 1, name: "Brake Pads Premium", category: "Brakes", price: "$89.99", stock: 45 },
    { id: 2, name: "Oil Filter Standard", category: "Filters", price: "$24.99", stock: 5 },
    { id: 3, name: "Spark Plugs Set", category: "Engine", price: "$34.99", stock: 78 },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  })

  const handleAddProduct = (e) => {
    e.preventDefault()
    const product = {
      id: products.length + 1,
      ...newProduct,
      price: `$${newProduct.price}`,
      stock: Number.parseInt(newProduct.stock),
    }
    setProducts([...products, product])
    setNewProduct({ name: "", category: "", price: "", stock: "" })
    setShowAddForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Add Product
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Product</h3>
          <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            <input
              type="number"
              placeholder="Price (without $)"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            <input
              type="number"
              placeholder="Stock Quantity"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
            <div className="col-span-2 flex space-x-2">
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${product.stock < 10 ? "text-red-500" : "text-gray-900"}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-red-600 hover:text-red-800 mr-3">Edit</button>
                    <button className="text-red-500 hover:text-red-400">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Inventory Section Component
function InventorySection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Low Stock Alert</h3>
          <p className="text-3xl font-bold text-red-500">23</p>
          <p className="text-sm text-gray-600">Items need restocking</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-gray-900">342</p>
          <p className="text-sm text-gray-600">In inventory</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory Value</h3>
          <p className="text-3xl font-bold text-gray-900">$45,678</p>
          <p className="text-sm text-gray-600">Total stock value</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Movements</h3>
        <div className="space-y-3">
          {[
            { action: "Stock Added", product: "Brake Pads Premium", quantity: "+50", time: "2 hours ago" },
            { action: "Stock Sold", product: "Oil Filter Standard", quantity: "-15", time: "4 hours ago" },
            { action: "Stock Added", product: "Spark Plugs Set", quantity: "+25", time: "1 day ago" },
          ].map((movement, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    movement.action === "Stock Added" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{movement.action}</p>
                  <p className="text-xs text-gray-600">{movement.product}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-medium ${
                    movement.quantity.startsWith("+") ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {movement.quantity}
                </p>
                <p className="text-xs text-gray-600">{movement.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Employees Section Component (Admin only)
function EmployeesSection() {
  const employees = [
    { id: 1, name: "John Admin", email: "admin@toyozu.com", role: "Admin", status: "Active" },
    { id: 2, name: "Sarah Secretary", email: "secretary@toyozu.com", role: "Secretary", status: "Active" },
    { id: 3, name: "Mike Employee", email: "employee@toyozu.com", role: "User Employee", status: "Active" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Employee Management</h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-red-600 hover:text-red-800 mr-3">Edit</button>
                    <button className="text-red-500 hover:text-red-400">Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Profile Section Component
function ProfileSection({ currentUser }) {
  const [profile, setProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: "+1 (555) 123-4567",
    department: "Administration",
  })

  const handleSave = (e) => {
    e.preventDefault()
    alert("Profile updated successfully!")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Department</label>
              <input
                type="text"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}

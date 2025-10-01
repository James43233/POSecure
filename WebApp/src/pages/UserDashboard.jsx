"use client"

import { useState, useEffect } from "react"
import WebHeader from "../WebHeader"
import axios from "axios";

export default function AccountDashboard() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("tracking")
  const [selectedOrders, setSelectedOrders] = useState([])


  // Helper: get token from localStorage
  const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // Fetch current user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/profile/me/", {
          headers: getAuthHeaders(),
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("access_token");

      await axios.post("http://localhost:8000/api/profile/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh profile after upload
      const res = await axios.get("http://localhost:8000/api/profile/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };


  if (loading) {
    return <p className="text-center text-gray-600">Loading profile...</p>;
  }

  if (!user) {
    return <p className="text-center text-red-600">No user data found.</p>;
  }


  const sidebarItems = [
    { id: "tracking", label: "Order Tracking", icon: "🚚" },
    { id: "profile", label: "User Details", icon: "👤" },
    { id: "addresses", label: "My Addresses", icon: "📍" },
    { id: "orders", label: "Order History", icon: "📦" },
    { id: "vouchers", label: "Vouchers", icon: "🎫" },
  ]

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: "$89.99",
      items: 3,
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-002",
      date: "2024-01-12",
      status: "In Transit",
      total: "$156.50",
      items: 2,
      trackingNumber: "TRK987654321",
    },
    {
      id: "ORD-003",
      date: "2024-01-10",
      status: "Processing",
      total: "$45.00",
      items: 1,
      trackingNumber: "TRK456789123",
    },
    {
      id: "ORD-004",
      date: "2024-01-08",
      status: "Pending",
      total: "$234.99",
      items: 4,
      trackingNumber: "TRK789123456",
    },
  ]

  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      name: "John Doe",
      address: "456 Business Ave, Suite 200",
      city: "New York, NY 10002",
      phone: "+1 (555) 987-6543",
      isDefault: false,
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "tracking":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-600 mb-2">Order Tracking</h2>
              <p className="text-gray-600">Track your orders and delivery status</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-center">Track Your Order</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter order ID or tracking number"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
                <button className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                  Track Order
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {orders
                .filter((order) => order.status !== "Delivered")
                .map((order) => (
                  <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{order.id}</h4>
                        <p className="text-gray-600">Ordered on {order.date}</p>
                        <p className="text-sm text-gray-500">Tracking: {order.trackingNumber}</p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          order.status === "In Transit"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow"></div>
                          <div className="w-20 h-1 bg-red-600"></div>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 border-white shadow ${
                              order.status === "Processing" || order.status === "In Transit"
                                ? "bg-red-600"
                                : "bg-gray-300"
                            }`}
                          ></div>
                          <div
                            className={`w-20 h-1 ${order.status === "In Transit" ? "bg-red-600" : "bg-gray-300"}`}
                          ></div>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 border-white shadow ${
                              order.status === "In Transit" ? "bg-red-600" : "bg-gray-300"
                            }`}
                          ></div>
                          <div className="w-20 h-1 bg-gray-300"></div>
                        </div>
                        <div className="w-4 h-4 bg-gray-300 rounded-full border-2 border-white shadow"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>Order Placed</span>
                        <span>Processing</span>
                        <span>In Transit</span>
                        <span>Delivered</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )

      case "profile":
        return (
           <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-600 mb-2">User Details</h2>
            </div>

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
              <div className="flex items-center mb-6">
                {user.profile_picture ? (
                  <img
                    src={`http://localhost:8000${user.profile_picture}`}
                    alt="Profile"
                    className="w-20 h-20 rounded-full mr-6 object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mr-6">
                    <span className="text-white text-2xl font-bold">
                      {user.user_name?.[0] || "?"}
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {user.user_name}
                  </h3>
                  <p className="text-gray-600">Email: {user.email || "—"}</p>
                  <p className="text-gray-600">Username: {user.username || "—"}</p>
                  <p className="text-gray-600">Phone: {user.mobile_phone || "—"}</p>
                </div>
              </div>

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="block mt-2"
              />
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-6 py-2 bg-red-600 text-white rounded-lg mt-3 disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload Picture"}
              </button>
            </div>
          </div>


        )

      case "addresses":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-600 mb-2">My Addresses</h2>
              <p className="text-gray-600">Manage your delivery addresses</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex justify-end mb-6">
                <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                  + Add New Address
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                  <div key={address.id} className="bg-white p-6 rounded-lg shadow-sm border relative">
                    {address.isDefault && (
                      <span className="absolute top-4 right-4 px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                        Default
                      </span>
                    )}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{address.type}</h3>
                      <p className="text-gray-700 font-medium">{address.name}</p>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <p>{address.address}</p>
                      <p>{address.city}</p>
                      <p>{address.phone}</p>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 text-sm font-medium">
                        Edit
                      </button>
                      <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                        Delete
                      </button>
                      {!address.isDefault && (
                        <button className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 text-sm font-medium">
                          Set Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "orders":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Order History</h2>
              <div className="flex gap-2">
                <select className="px-3 py-2 border rounded-lg bg-background">
                  <option>All Orders</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>In Transit</option>
                  <option>Delivered</option>
                </select>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="px-3 py-2 border rounded-lg bg-background"
                />
              </div>
            </div>

            <div className="bg-card rounded-lg border overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center p-4 border-b last:border-b-0 hover:bg-muted/50">
                    <input
                      type="checkbox"
                      className="mr-4"
                      checked={selectedOrders.includes(order.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders([...selectedOrders, order.id])
                        } else {
                          setSelectedOrders(selectedOrders.filter((id) => id !== order.id))
                        }
                      }}
                    />
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Items</p>
                        <p className="font-medium">{order.items} items</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-medium">{order.total}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "In Transit"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Processing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                        <button className="text-primary hover:underline text-sm">View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedOrders.length > 0 && (
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm">{selectedOrders.length} orders selected</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                    Track Selected
                  </button>
                  <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5">
                    Download Invoices
                  </button>
                </div>
              </div>
            )}
          </div>
        )

      case "vouchers":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Vouchers</h2>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                Browse Offers
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className={`p-6 rounded-lg border-2 ${
                    order.status === "Delivered" ? "border-primary bg-primary/5" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">🎫</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{order.total}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Order ID: {order.id}</p>
                  <p className="text-sm text-muted-foreground mb-4">Tracking: {order.trackingNumber}</p>
                  {order.status === "Delivered" && (
                    <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                      Use Now
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Redeem Voucher Code</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter voucher code"
                  className="flex-1 px-3 py-2 border rounded-lg bg-background"
                />
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                  Redeem
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Content for {activeTab} coming soon...</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fdf2f8" }}>
      <WebHeader />
      

      <div className="flex max-w-7xl mx-auto">
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-6">
            <ul className="space-y-3">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors font-medium ${
                      activeTab === item.id
                        ? "bg-red-600 text-white"
                        : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-8">{renderContent()}</main>
      </div>
    </div>
  )
}

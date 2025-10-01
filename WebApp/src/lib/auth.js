// Role-based authentication system
export const USER_ROLES = {
  ADMIN: "admin",
  SECRETARY: "secretary",
  USER_EMPLOYEE: "user_employee",
}

export const PERMISSIONS = {
  VIEW_CONFIDENTIAL: "view_confidential",
  MANAGE_EMPLOYEES: "manage_employees",
  VIEW_ANALYTICS: "view_analytics",
  MANAGE_PRODUCTS: "manage_products",
  MANAGE_INVENTORY: "manage_inventory",
  VIEW_ORDERS: "view_orders",
  EDIT_PROFILE: "edit_profile",
}

export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.VIEW_CONFIDENTIAL,
    PERMISSIONS.MANAGE_EMPLOYEES,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_INVENTORY,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.EDIT_PROFILE,
  ],
  [USER_ROLES.SECRETARY]: [
    PERMISSIONS.VIEW_CONFIDENTIAL,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.EDIT_PROFILE,
  ],
  [USER_ROLES.USER_EMPLOYEE]: [PERMISSIONS.MANAGE_PRODUCTS, PERMISSIONS.MANAGE_INVENTORY, PERMISSIONS.EDIT_PROFILE],
}

// Mock user data - in real app this would come from database
export const mockUsers = [
  {
    id: 1,
    name: "John Admin",
    email: "admin@toyozu.com",
    role: USER_ROLES.ADMIN,
    avatar: "/admin-avatar.png",
  },
  {
    id: 2,
    name: "Sarah Secretary",
    email: "secretary@toyozu.com",
    role: USER_ROLES.SECRETARY,
    avatar: "/secretary-avatar.jpg",
  },
  {
    id: 3,
    name: "Mike Employee",
    email: "employee@toyozu.com",
    role: USER_ROLES.USER_EMPLOYEE,
    avatar: "/employee-avatar.png",
  },
]

export function hasPermission(userRole, permission) {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false
}

export function getCurrentUser() {
  // Mock current user - in real app this would come from session/JWT
  return mockUsers[0] // Default to admin for demo
}

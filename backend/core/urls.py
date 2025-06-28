from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers
from .views import (
    LoginView,
    ProductViewSet, BrandViewSet, CategoryViewSet,
    SupplierViewSet, SupplyViewSet, SupplyDetailsViewSet, ConditionViewSet,
    ProductAdminDeleteView, TwoFAVerifyView, RegisterEmployeeView, LowStockProductsView, TopSellingProductsView, RecentTransactionsView,
    AvailableProductsStatsView
)

router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'brands', BrandViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'suppliers', SupplierViewSet)
router.register(r'supplies', SupplyViewSet)
router.register(r'supply-details', SupplyDetailsViewSet)
router.register(r'conditions', ConditionViewSet)

urlpatterns = [
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/', include(router.urls)),
    path('api/products/<int:product_id>/admin_delete/', ProductAdminDeleteView.as_view(), name='admin_delete_product'),
    path('api/verify-otp/', TwoFAVerifyView.as_view(), name='verify-otp'),
    path('api/register/', RegisterEmployeeView.as_view(), name='register-employee'),
    path('api/low-stock-products/', LowStockProductsView.as_view()),
    path('api/top-selling-products/', TopSellingProductsView.as_view()),
    path('api/recent-transactions/', RecentTransactionsView.as_view()),
    path('api/product-stats/', AvailableProductsStatsView.as_view()),
]
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from django.contrib.auth.hashers import check_password
from .models import UserEmployee, Product, Brand, Category, Supplier, Supply, SupplyDetails, Condition, EmailDevice
from .serializers import (
    ProductSerializer, BrandSerializer, CategorySerializer, SupplierSerializer,
    SupplySerializer, SupplyDetailsSerializer, ConditionSerializer,
    ProductJoinedSerializer, SupplyReceiptSerializer, UserEmployeeSerializer
)
from .serializers import LoginSerializer, TwoFAVerifySerializer
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
import random
from .utils import send_sms_otp


User = get_user_model()

def send_otp_to_user(user):
    import random
    from django.utils import timezone
    code = '{:06d}'.format(random.randint(0, 999999))
    valid_until = timezone.now() + timezone.timedelta(minutes=10)
    # Save OTP device entry
    EmailDevice.objects.create(
        name="default",
        confirmed=False,
        user_id=user.pk,
        token=code,
        valid_until=valid_until,
        email=user.email,
        throttling_failure_count=0,
        created_at=timezone.now(),
    )
    # Send OTP via preferred channel
    if hasattr(user, "contact_type") and user.contact_type == 'phone' and user.phone_number:
        send_sms_otp(user.phone_number, code)
    elif hasattr(user, "email") and user.email:
        send_mail(
            'Your verification code',
            f'Your OTP code is: {code}',
            getattr(settings, "DEFAULT_FROM_EMAIL", "no-reply@example.com"),
            [user.email],
            fail_silently=False,
        )
    else:
        print("No valid contact method for OTP!")
        
        
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            send_otp_to_user(user)
            return Response({'detail': 'OTP sent, please check your email.', 'otp_required': True})
        else:
            return Response({'detail': 'Invalid credentials'}, status=400)

class TwoFAVerifyView(APIView):
    def post(self, request):
        serializer = TwoFAVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        code = serializer.validated_data['token']

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'Invalid username.'}, status=status.HTTP_401_UNAUTHORIZED)

        now = timezone.now()
        otp_qs = EmailDevice.objects.filter(
            user_id=user.pk,
            token=code,
            confirmed=False,
            valid_until__gte=now
        ).order_by('-created_at')
        if otp_qs.exists():
            otp = otp_qs.first()
            otp.confirmed = True
            otp.save()
            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role_Id': getattr(user.role, 'role_id', None),  # Safe way to get role_id, or None if missing
                'username': user.username,
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid or expired verification code.'}, status=status.HTTP_401_UNAUTHORIZED)
        
class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserEmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]  # safer than AllowAny
    queryset = UserEmployee.objects.all()
    lookup_field = "user_id"

class CurrentUserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserEmployeeSerializer(request.user)
        return Response(serializer.data)
    
class UploadProfilePictureView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        file = request.FILES.get("profile_picture")
        if not file:
            return Response({"error": "No file uploaded"}, status=400)
        request.user.profile_picture = file
        request.user.save(update_fields=["profile_picture"])
        return Response({"message": "Profile picture updated"})

        

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-product_id')
    # Use different serializer for list/retrieve (joined), and for create/update (normal)
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return ProductJoinedSerializer
        return ProductSerializer

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class SupplyViewSet(viewsets.ModelViewSet):
    queryset = Supply.objects.all()
    serializer_class = SupplySerializer


class SupplyDetailsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SupplyDetails.objects.all()
    serializer_class = SupplyDetailsSerializer

    def get_object(self):
        # custom lookup using supply_id and product_id from URL
        supply_id = self.kwargs.get('supply_id')
        product_id = self.kwargs.get('product_id')
        return SupplyDetails.objects.get(supply_id=supply_id, product_id=product_id)

class ConditionViewSet(viewsets.ModelViewSet):
    queryset = Condition.objects.all()
    serializer_class = ConditionSerializer

class SupplyReceiptViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Supply.objects.all()
    serializer_class = SupplyReceiptSerializer
    
class SupplyReceiptsList(APIView):
    def get(self, request):
        receipts = Supply.objects.all().values('supply_id', 'receipt_number')
        return Response(list(receipts))
    
class StockInProductView(APIView):
    def post(self, request):
        product_id = request.data.get('product_id')
        receipt_number = request.data.get('receipt_number')
        quantity = request.data.get('quantity')
        price = request.data.get('price')
        condition_id = request.data.get('condition_id')


        if not all([product_id, receipt_number, quantity, price, condition_id]):
            return Response({'error': 'Missing required fields.'}, status=status.HTTP_400_BAD_REQUEST)

 
        try:
            supply = Supply.objects.get(receipt_number=receipt_number)
        except Supply.DoesNotExist:
            return Response({'error': 'Supply with this receipt number does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            condition = Condition.objects.get(pk=condition_id)
        except Condition.DoesNotExist:
            return Response({'error': 'Condition does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        supply_detail = SupplyDetails.objects.create(
            supply=supply,
            product=product,
            quantity=quantity,
            price=price,
            subtotal=float(quantity) * float(price),
            condition=condition
        )

        product.purchase_price = price
        product.quantity = product.quantity + int(quantity)
        product.save()

        return Response({'message': 'Stock-in successful.'}, status=status.HTTP_201_CREATED)
    
    
class SupplyCreateView(APIView):
    def post(self, request):
        receipt_number = request.data.get('receipt_number')
        supplier_id = request.data.get('supplier')


        if not receipt_number or not supplier_id:
            return Response({'error': 'Receipt number and supplier are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            supplier = Supplier.objects.get(pk=supplier_id)
        except Supplier.DoesNotExist:
            return Response({'error': 'Supplier does not exist.'}, status=status.HTTP_400_BAD_REQUEST)


        supply = Supply.objects.create(
            receipt_number=receipt_number,
            supplier=supplier,

        )
        return Response({
            'supply_id': supply.supply_id,
            'receipt_number': supply.receipt_number,
            'supplier_id': supplier.supplier_id,
            'supplier_name': supplier.name,
        }, status=status.HTTP_201_CREATED)
        

class ProductAdminDeleteView(APIView):
    def post(self, request, product_id):
        username = request.data.get('username')
        password = request.data.get('password')
        if not username or not password:
            return Response({'error': 'Username and password required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = UserEmployee.objects.get(username=username)
        except UserEmployee.DoesNotExist:
            return Response({'error': 'Admin user not found or wrong credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Use check_password instead of direct password comparison
        if not check_password(password, user.password):
            return Response({'error': 'Admin user not found or wrong credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        if user.role_id != 1:
            return Response({'error': 'Not authorized. Admin access required.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            product = Product.objects.get(pk=product_id)
            product.delete()
            return Response({'message': 'Product deleted.'}, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
        
class RegisterEmployeeView(APIView):
    def post(self, request):
        serializer = UserEmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'detail': 'Employee registered!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LowStockProductsView(APIView):
    def get(self, request):
        products = Product.objects.filter(quantity__lte=10).order_by('quantity')
        data = [{"product_id": p.product_id, "name": p.name, "quantity": p.quantity} for p in products]
        return Response(data)
    
class TopSellingProductsView(APIView):
    def get(self, request):
        top_products = (
            SupplyDetails.objects
            .values(product_id=F('product__product_id'), product_name=F('product__name'))
            .annotate(sales_count=Count('product_id'), total_revenue=Sum('subtotal'))
            .order_by('-sales_count')[:5]
        )
        return Response(top_products)
    
class RecentTransactionsView(APIView):
    def get(self, request):
        transactions = Supply.objects.select_related('supplier', 'user').order_by('-date')[:5]
        data = [
            {
                "supply_id": t.supply_id,
                "receipt_number": t.receipt_number,
                "supplier": t.supplier.name if t.supplier else "",
                "user": t.user.username if t.user else "",
                "total_cost": str(t.total_cost),
                "date": t.date
            }
            for t in transactions
        ]
        return Response(data)
    
class AvailableProductsStatsView(APIView):
    def get(self, request):
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM available_products_view')
            row = cursor.fetchone()
        data = {
            "Total_Available_Products": row[0] if row else 0
        }
        return Response(data)
    
def send_otp(user, otp_code):
    if user.contact_type == 'phone' and user.phone_number:
        send_sms_otp(user.phone_number, otp_code)  # This will print to the console
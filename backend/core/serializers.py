from rest_framework import serializers
from .models import UserEmployee, Product, Brand, Category, Supplier, Supply, SupplyDetails, Condition, RoleType, Sale, RoleType


class UserEmployeeSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role_id = serializers.PrimaryKeyRelatedField(
        queryset=RoleType.objects.all(),
        source='role',
        write_only=True
    )
    role = serializers.StringRelatedField(read_only=True)
    role_Id = serializers.IntegerField(source='role.role_id', read_only=True)  

    class Meta:
        model = UserEmployee
        fields = [
            'user_id', 'User_name', 'username', 'password', 'email',
            'mobile_phone', 'role_id', 'role', 'role_Id'
        ]
        read_only_fields = ['user_id', 'role', 'role_Id']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = UserEmployee(**validated_data)
        user.set_password(password)
        user.save()
        return user
        
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condition
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    brand_id = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all(), source='brand', write_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True)
    class Meta:
        model = Product
        fields = ['product_id', 'name', 'description', 'brand', 'brand_id', 'category', 'category_id', 'purchase_price', 'selling_price', 'quantity']

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class SupplySerializer(serializers.ModelSerializer):

    supplier_name = serializers.CharField(source='supplier.name', read_only=True)

    class Meta:
        model = Supply
     
        fields = ['supply_id', 'receipt_number', 'supplier', 'supplier_name', 'user', 'total_cost', 'date']

class SupplyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupplyDetails
        fields = ['supply', 'product', 'quantity', 'price', 'subtotal', 'condition']

class SupplyReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supply
        fields = ['supply_id', 'receipt_number']
        
class ProductJoinedSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    condition_item = serializers.SerializerMethodField()
    supplier_name = serializers.SerializerMethodField()
    supply_date = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'product_id',
            'name',
            'category_name',
            'brand_name',
            'condition_item',  
            'supplier_name',
            'supply_date',
            'purchase_price',
            'selling_price',
            'quantity',
        ]

    def get_condition_item(self, obj):
        detail = (
            SupplyDetails.objects
            .filter(product=obj)
            .select_related('condition', 'supply')
            .order_by('-supply__date')
            .first()
        )
        if detail and detail.condition:
            return detail.condition.name  
        return None

    def get_supplier_name(self, obj):
        detail = (
            SupplyDetails.objects
            .filter(product=obj)
            .select_related('supply__supplier')
            .order_by('-supply__date')
            .first()
        )
        if detail and detail.supply and detail.supply.supplier:
            return detail.supply.supplier.name
        return None

    def get_supply_date(self, obj):
        detail = (
            SupplyDetails.objects
            .filter(product=obj)
            .select_related('supply')
            .order_by('-supply__date')
            .first()
        )
        if detail and detail.supply:
            return detail.supply.date
        return None

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class TwoFAVerifySerializer(serializers.Serializer):
    username = serializers.CharField()
    token = serializers.CharField()
    

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_name', 'quantity']

class SaleSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.customer_name', read_only=True)
    
    class Meta:
        model = Sale
        fields = ['sale_id', 'date', 'total_amount', 'customer_name']
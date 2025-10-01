from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.auth import get_user_model
from django.utils import timezone
import random

class Brand(models.Model):
    brand_id = models.AutoField(primary_key=True, db_column='Brand_ID')
    name = models.CharField(max_length=100, db_column='Brand_Name')

    class Meta:
        db_table = 'brand'
        managed = False

    def __str__(self):
        return self.name

class Category(models.Model):
    category_id = models.AutoField(primary_key=True, db_column='Category_ID')
    name = models.CharField(max_length=100, db_column='Category_Name')

    class Meta:
        db_table = 'category'
        managed = False

    def __str__(self):
        return self.name
    
class Condition(models.Model):
    condition_id = models.AutoField(primary_key=True, db_column='Condition_ID')
    name = models.CharField(max_length=50, db_column='Condition_Name')

    class Meta:
        db_table = 'condition_item'
        managed = False

    def __str__(self):
        return self.name

class Product(models.Model):
    product_id = models.AutoField(primary_key=True, db_column='Product_ID')
    name = models.CharField(max_length=255, db_column='Product_Name')
    description = models.TextField(blank=True, db_column='Product_Description')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, db_column='Brand_ID')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, db_column='Category_ID')
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2, db_column='Purchase_Price')
    selling_price = models.DecimalField(max_digits=10, decimal_places=2, db_column='Selling_Price')
    quantity = models.IntegerField(db_column='Quantity')

    class Meta:
        db_table = 'product'
        managed = False

    def __str__(self):
        return self.name

class Supplier(models.Model):
    supplier_id = models.AutoField(primary_key=True, db_column='Supplier_ID')
    name = models.CharField(max_length=255, db_column='Supplier_Name')
    contact_number = models.CharField(max_length=50, db_column='Contact_Number')
    address = models.CharField(max_length=255, db_column='Address')

    class Meta:
        db_table = 'supplier'
        managed = False

    def __str__(self):
        return self.name
    
class Supply(models.Model):
    supply_id = models.AutoField(primary_key=True, db_column='Supply_ID')
    user = models.ForeignKey('UserEmployee', on_delete=models.CASCADE, db_column='User_ID')
    supplier = models.ForeignKey('Supplier', on_delete=models.CASCADE, db_column='Supplier_ID')
    total_cost = models.DecimalField(max_digits=12, decimal_places=2, db_column='Total_Cost')
    receipt_number = models.CharField(max_length=100, db_column='Receipt_Number')
    date = models.DateField(db_column='Date')

    class Meta:
        db_table = 'supply'
        managed = False

class SupplyDetails(models.Model):
    id = models.AutoField(primary_key=True)
    supply = models.ForeignKey('Supply', on_delete=models.CASCADE, db_column='Supply_ID')
    product = models.ForeignKey('Product', on_delete=models.CASCADE, db_column='Product_ID')
    quantity = models.IntegerField(db_column='Quantity')
    price = models.DecimalField(max_digits=10, decimal_places=2, db_column='Price')
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, db_column='subtotal')
    condition = models.ForeignKey('Condition', on_delete=models.CASCADE, db_column='Condition_ID')

    class Meta:
        db_table = 'supply_details'
        unique_together = (('supply', 'product'),)
        managed = False  # Django will not touch the table!
    def __str__(self):
        return f"SupplyDetails(id={self.id}, supply={self.supply_id}, product={self.product_id})"

class UserEmployeeManager(BaseUserManager):
    def create_user(self, username, password=None, email=None, mobile_phone=None, role=None, user_name=None, **extra_fields):
        if not username:
            raise ValueError('The Username must be set')
        email = self.normalize_email(email)
        user = self.model(
            username=username,
            email=email,
            mobile_phone=mobile_phone,
            role=role,
            User_name=user_name,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password, email=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, email, **extra_fields)

class RoleType(models.Model):
    role_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)

    class Meta:
        db_table = 'role_type'
        managed = False 
        
class UserEmployee(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=255)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    email = models.EmailField(max_length=255, null=True, blank=True)
    mobile_phone = models.CharField(max_length=20, null=True, blank=True)
    # Add this field:
    contact_type = models.CharField(
        max_length=10,
        choices=[('email', 'Email'), ('phone', 'Phone')],
        default='email'
    )
    role = models.ForeignKey(RoleType, on_delete=models.SET_NULL, null=True, db_column='role_id')
    is_superuser = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to="profile_pics/", null=True, blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['user_name', 'email']


    objects = UserEmployeeManager()

    class Meta:
        db_table = 'user_employee'
        managed = False  

    def __str__(self):
        return self.username

    @property
    def id(self):
        return self.user_id
    
User = get_user_model()

class UserOTP(models.Model):
    METHOD_CHOICES = (
        ('email', 'Email'),
        ('phone', 'Phone'),
    )

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey('UserEmployee', on_delete=models.CASCADE, db_column='user_id', related_name='otps')
    code = models.CharField(max_length=6)
    method = models.CharField(max_length=10, choices=METHOD_CHOICES, default='email')
    confirmed = models.BooleanField(default=False)
    used = models.BooleanField(default=False)  # Optional: track if OTP has been used
    valid_until = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'user_otp'
        managed = True  # Now Django will handle migrations and DB table

    def __str__(self):
        return f"OTP for {self.user.username} via {self.method} (confirmed={self.confirmed})"

    @staticmethod
    def generate_code():
        import random
        return '{:06d}'.format(random.randint(0, 999999))

    def is_valid(self):
        from django.utils import timezone
        return not self.used and not self.confirmed and timezone.now() < self.valid_until
    
class EmailDevice(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=64)
    confirmed = models.BooleanField()
    user_id = models.IntegerField()
    token = models.CharField(max_length=16)
    valid_until = models.DateTimeField()
    email = models.CharField(max_length=254, null=True, blank=True)
    throttling_failure_count = models.PositiveIntegerField(null=True, blank=True)
    throttling_failure_timestamp = models.DateTimeField(null=True, blank=True)
    last_generated_timestamp = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(null=True, blank=True)
    last_used_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'otp_email_emaildevice'
        managed = False

    def __str__(self):
        return f"{self.email} (confirmed: {self.confirmed})"
    
class Sale(models.Model):
    sale_id = models.AutoField(primary_key=True, db_column='Sale_ID')
    customer = models.ForeignKey('Customer', null=True, blank=True, on_delete=models.SET_NULL, db_column='Customer_ID')
    user = models.ForeignKey('UserEmployee', null=True, blank=True, on_delete=models.SET_NULL, db_column='User_ID')
    total_amount = models.IntegerField(null=True, blank=True, db_column='Total_Amount')
    payment_type = models.CharField(max_length=255, null=True, blank=True, db_column='Payment_Type')
    date = models.DateField(null=True, blank=True, db_column='Date')

    class Meta:
        db_table = 'sale'
        managed = False  

    def __str__(self):
        return f"Sale #{self.sale_id}"
    
    
# Customer model
class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True, db_column='Customer_ID')
    customer_name = models.CharField(max_length=255, db_column='Customer_Name')
    contact_number = models.CharField(max_length=50, db_column='Contact_Number')
    address_id = models.IntegerField(db_column='Address_ID', null=True, blank=True)

    class Meta:
        db_table = 'customer'
        managed = False

    def __str__(self):
        return self.customer_name


class SaleDetails(models.Model):
    sale_detail_id = models.AutoField(primary_key=True, db_column='Sale_Detail_ID')
    product = models.ForeignKey('Product', on_delete=models.CASCADE, db_column='Product_ID', null=True, blank=True)
    quantity = models.IntegerField(db_column='Quantity', null=True, blank=True)
    selling_price = models.IntegerField(db_column='Selling_Price', null=True, blank=True)
    sub_total = models.IntegerField(db_column='Sub_total', null=True, blank=True)
    sale = models.ForeignKey('Sale', on_delete=models.CASCADE, db_column='Sale_ID', null=True, blank=True)

    class Meta:
        db_table = 'sale_details'
        managed = False

    def __str__(self):
        return f"SaleDetail #{self.sale_detail_id} for Sale #{self.sale.sale_id if self.sale else 'N/A'}"
    
    

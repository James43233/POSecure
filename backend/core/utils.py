from django.core.mail import send_mail
from django.conf import settings
from .models import UserOTP

def send_sms_otp(phone_number, otp_code):
    print(f"[DUMMY SMS] Sending OTP {otp_code} to phone {phone_number}")
    # For production: integrate with Twilio or other SMS provider

def send_otp_to_user(user):
    code = UserOTP.generate_code()
    method = getattr(user, "contact_type", "email")
    phone_number = getattr(user, "mobile_phone", None)
    email = getattr(user, "email", None)

    from django.utils import timezone
    valid_until = timezone.now() + timezone.timedelta(minutes=10)
    UserOTP.objects.create(
        user=user,
        code=code,
        method=method,
        confirmed=False,
        valid_until=valid_until
    )

    if method == 'phone' and phone_number:
        send_sms_otp(phone_number, code)
    elif method == 'email' and email:
        send_mail(
            'Your verification code',
            f'Your OTP code is: {code}',
            getattr(settings, "DEFAULT_FROM_EMAIL", "no-reply@example.com"),
            [email],
            fail_silently=False,
        )
    else:
        print("No valid contact method for OTP!")
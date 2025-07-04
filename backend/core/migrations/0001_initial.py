# Generated by Django 5.2.1 on 2025-06-03 13:10

import pyotp
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserEmployee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=150, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('mfa_secret', models.CharField(default=pyotp.random_base32, max_length=32)),
            ],
        ),
    ]

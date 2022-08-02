from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Trainer(AbstractUser):
  email = models.EmailField(
    verbose_name='email address',
    max_length=255,
    unique=True,
  )

  USERNAME_FIELD: 'email'
  REQUIRED_FIELDS = []
  
class Pokemon(models.Model):
  species = models.CharField(max_length=255)
  happiness = models.IntegerField(default=10)
  hunger = models.IntegerField(default=10)
  last_fed = models.DateTimeField(auto_now=True)
  cry = models.FileField(upload_to='cries/')
  sprite = models.CharField(max_length=255, default='')
  trainer = models.OneToOneField(Trainer, on_delete=models.CASCADE, unique=True)
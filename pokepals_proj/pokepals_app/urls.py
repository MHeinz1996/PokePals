from django.urls import path
from . import views

urlpatterns = [
  path('', views.index, name="index"),
  path('signup', views.sign_up, name="signup"),
  path('login', views.log_in, name="login"),
  path('logout', views.log_out, name="logout"),
  path('whoami', views.who_am_i, name="whoami"),
  path('pokemon', views.pokemon, name="pokemon")
]
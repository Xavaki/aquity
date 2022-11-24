from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/data/', views.get_district_data.as_view()),
    path('sintetic/', views.index, name='sintetic'),
    path('sintetic/api/data/', views.get_sinthetic_data.as_view(), name='sintetic_data'),
]

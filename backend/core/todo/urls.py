from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('users', views.UserViewSet, basename='user')
router.register('tasks', views.TaskViewSet, basename='task')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/login/', views.LoginApiView.as_view(), name='login'),
    path('api/logout/', views.LogoutApiView.as_view(), name='logout'),
]
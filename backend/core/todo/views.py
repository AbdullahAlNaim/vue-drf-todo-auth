from .models import Task
from .serializers import TaskSerializer, UserSerializer
from .permissions import IsOwnerReadOnly
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import status, viewsets, mixins, permissions
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated


class LoginApiView(APIView):
    permission_classes = [AllowAny,]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
             return JsonResponse({'error': 'username and password are required.'}, status=401) 

        user = authenticate(request, username=username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            print({'token': str(token.key), 'id': user.id})
            return JsonResponse({
                'token': str(token.key),
                'user_id': user.id,
                })

        
        return JsonResponse({'error': 'Invalid credentails'}, status=401)

        

class LogoutApiView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            logout(request)
            print('logout successful')
        except:
            print('logout issue')   
        
        return Response({'message': 'logout success'}, status=status.HTTP_200_OK)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query_set = super().get_queryset()

        user = self.request.user
        if user.is_authenticated:
            return super().get_queryset().filter(owner=user)

        return super().get_queryset().none()

    def perform_create(self, serialzier):
        serialzier.save(owner=self.request.user)

        user = serialzier.instance.owner
        if not Token.objects.filter(user=user).exists():
            Token.objects.create(user=user)
    


class UserViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(username=request.data['username'])
        token,created = Token.objects.get_or_create(user=user)
        response.data['token'] = token.key
        return response

# {
    # "username": "bulma",
    # "token": "f774475bce0d811c647968bc55c54bd7c26dfc69"
# }
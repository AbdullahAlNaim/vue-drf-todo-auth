from django.db import models

# Create your models here.
class Task(models.Model):
    task_name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey('auth.User', related_name='task', on_delete=models.CASCADE)

    class Meta:
        ordering = ['created_at']
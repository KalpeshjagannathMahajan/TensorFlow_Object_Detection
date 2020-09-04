from django.conf.urls import include, url
from django.contrib import admin
from tensorflowApp.views import ObjectDetection

urlpatterns = [
    url('detect/', ObjectDetection.detect_objects, name='index'),
    url('index/', ObjectDetection.index, name='index'),
]
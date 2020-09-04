from django.conf import settings
from django.contrib import admin
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
	    url(r'^admin/', admin.site.urls),
	    # redirecting base urls to tensorflowApp urls
	    url(r'', include('tensorflowApp.urls')),
	] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns += staticfiles_urlpatterns()

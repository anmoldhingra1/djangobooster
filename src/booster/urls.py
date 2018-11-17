from django.conf.urls import url
from booster.views import Server

urlpatterns = [
    url(r'^get_pages/', Server.as_view(template_name="get_pages.html")),
]
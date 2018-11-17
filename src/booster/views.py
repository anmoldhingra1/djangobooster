from django.shortcuts import render
from django.core.urlresolvers import resolve
from django.views.generic.base import TemplateView


# Create your views here.
class Server(TemplateView):
	template_name = "get_pages.html"
	def get(self,request):
		return


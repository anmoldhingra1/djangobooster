from django.shortcuts import render
from django.core.urlresolvers import resolve
from django.views.generic.base import TemplateView


# Create your views here.
def server(request):
	import json
	with open("train_data.txt","a") as f:
		json.dump(request.GET,f)
		f.write('\n')

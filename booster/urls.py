from django.conf.urls import url,patterns

from django.conf.urls import patterns, url

urlpatterns = patterns('',
    url(r'^training_data/', 'booster.views.server'),
    url(r'^train/', 'booster.views.train'),
    )
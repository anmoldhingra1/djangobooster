"""
Analytical template tags and filters.
"""

from __future__ import absolute_import

import logging

from django import template
from django.template import Node, TemplateSyntaxError
from importlib import import_module
from django import template

register = template.Library()


@register.simple_tag(takes_context=False)
def boost_all_links():
	with open('booster/templatetags/engine.htm') as f:
		return f.read()
import json

from django.shortcuts import render
from django.core.urlresolvers import resolve
from django.views.generic.base import TemplateView
from django.http import HttpResponse

from keras.layers import Input,SimpleRNN,Dense,Concatenate
from keras.models import Model

import numpy as np

MAX_HISTORY = 8

# Create your views here.
def server(request):
	
	with open("train_data.txt","a") as f:
		json.dump(request.GET,f)
		f.write('\n')

def get_data():
	data = []
	with open('train_data.txt') as f:
		for line in f.readlines():
			data.append({k:json.loads(v) for k,v in json.loads(line).items()})

	def processed_history(array):
		new_array = []
		if len(array) < MAX_HISTORY:
			new_array.append([[0,0]]*(MAX_HISTORY-len(array)))
		for a in array:
			if len(new_array) == MAX_HISTORY:
				break
			new_array.append(a)
		return new_array

	inpdata1 = np.array([processed_history(d['mouse_history']) for d in data])
	inpdata2 = np.array([[d['height'],d['width']]+d['relative_pos'] for d in data])
	labels = np.array([d['label'] for d in data])
	return [inpdata1,inpdata2],labels

def get_model_architecture():
	

	inp_layer1 = Input((MAX_HISTORY,2,))
	rnn_layer = SimpleRNN(10)(inp_layer1)

	inp_layer2 = Input((4,))
	conc1 = Concatenate()([rnn_layer,inp_layer2])
	dense_l = Dense(10,activation='tanh')(conc1)
	out = Dense(1,activation='sigmoid')(dense_l)

	model = Model([inp_layer1,inp_layer2],out)
	model.compile(loss='binary_crossentropy',metrics=['acc'],optimizer='adam')
	return model
	

def train(request):
	data = get_data()
	model = get_model_architecture()
	model.fit(data[0],data[1],epochs=100,validation_split=0.1)
	model.save('model.h5')
	return HttpResponse(200)

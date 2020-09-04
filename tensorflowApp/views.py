import os
import json
from PIL import Image
from datetime import datetime
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic.edit import View
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from obj_det_models.models.research.obj_detection import detect_objects_from_images


class ObjectDetection(View):
	def index(request):
		return render(request,'index.html')

	def detect_objects(request):
		message = ''
		input_image = ''
		output_image = ''

		# to catch any unexpected errors
		try:
			if(request.FILES):
				image = request.FILES['image']
				# validate the file if it is of required format
				if image.name.lower().endswith(('.jpg','jpeg','png')):
					# adding current date time to image name so that they will be unique
					current_date_time = '_'+datetime.now().strftime("%Y%m%d_%H%M%S")+'.'
					image_name = current_date_time.join(image.name.split('.'))
					# saving the input image on disc
					path = default_storage.save('input_images/'+image_name, ContentFile(image.read()))
					input_images_paths = os.path.join(settings.MEDIA_ROOT, path)

					# path to output direcory to save output image
					out_image_path = os.path.join(settings.MEDIA_ROOT,'output_images/')

					# check if output direcory exist else create
					is_direcory_exists = os.path.isdir(out_image_path)
					os.makedirs(out_image_path) if not is_direcory_exists else ''

					out_image_array = detect_objects_from_images(input_images_paths)

					# converting numpy array to image
					img = Image.fromarray(out_image_array, 'RGB')
					out_image_name = out_image_path+image_name
					img.save(out_image_name)

					input_image = image_name
					output_image = image_name
				else:
					message = 'Invalid image format.'
		except Exception:
			message = 'Someting is wrong.'

		input_output_images = {'input_image':input_image,'output_image':output_image,'message':message}
		return HttpResponse(json.dumps(input_output_images), content_type = "application/json")
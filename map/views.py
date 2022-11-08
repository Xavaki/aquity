from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
# from .nenutils.azure_db import Connection_db
import json 

# Create your views here.
def index(request):
    context = {}
    return render(request, 'map/index.html', context)



class get_district_polygons(APIView):
    authentication_classes = []
    permission_classes = []
    def get(self, request):
        with open('./0301100100_UNITATS_ADM_POLIGONS_TRANSFORMED.json') as f:
            response = json.load(f)
        return Response(response)
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
# from .nenutils.azure_db import Connection_db
import json 
import csv

# Create your views here.
def index(request):
    context = {}
    return render(request, 'map/index.html', context)


class get_district_data(APIView):
    authentication_classes = []
    permission_classes = []
    def get(self, request):
        
        with open('./0301100100_UNITATS_ADM_POLIGONS_TRANSFORMED.json') as f:
            geojson = json.load(f)
        
        idsDist = {
            1: 'Ciutat Vella',
            2: 'Eixample',
            3: 'Sants-Montjuic',
            4: 'Les Corts',
            5: 'Sarria-Sant Gervasi',
            6: 'Gracia',
            7: 'Horta-Guinardo',
            8: 'Nou Barris',
            9: 'Sant Andreu',
            10: 'Sant Marti',
        }

        distIds = {d : i for i,d in idsDist.items()}
        distIds

        rows = []
        with open('relation_district_water_consumption.xlsx - Hoja1.csv', mode='r') as infile:
            reader = csv.reader(infile)
            for row in reader:
                rows.append(row)
                
        fields = rows[0]
        dist_info_all = {}
        for row in rows[1:]:
            dist_name = row[0]
            if dist_name == 'Sarria-Gervasi': 
                dist_name = 'Sarria-Sant Gervasi'
            dist_id = distIds[dist_name]
            dist_info = {}
            for (k,v) in zip(fields,row): 
                dist_info[k] = v
            dist_info_all[dist_id] = dist_info

        response = {
            "geojson" : geojson, 
            "dist_info" : dist_info_all
        }

        return Response(response)

class get_sinthetic_data(APIView):
    authentication_classes = []
    permission_classes = []
    def get(self, request):
        
        with open('./HH_SINTETICS.json') as f:
            response = json.load(f)
        
        return Response(response)



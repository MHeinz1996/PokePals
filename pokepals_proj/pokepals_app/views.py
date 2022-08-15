from django.forms.models import model_to_dict
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from .models import Trainer, Pokemon
import requests, json, os, subprocess
from django.utils import timezone

path = subprocess.check_output(['pwd']).decode("utf-8").strip() # Runs pwd from terminal, converts from binary to string, then strips newline chars

def index(request):
  # reads static/index.html file created by React and serves it to the frontend
  index = open('static/index.html').read()
  return HttpResponse(index)

########################################################################################################
# AUTH                                                                                                 #
########################################################################################################
  
@api_view(['POST'])
def sign_up(request):
  try:
    trainer = Trainer.objects.create_user(username=request.data['email'], password=request.data['password'], email=request.data['email'])
    trainer.full_clean()
    trainer.save()
  except Exception as e:
    return JsonResponse({'success': False, 'error': e})
  return JsonResponse({'success': True})
  
@api_view(['POST'])
def log_in(request):
    # DRF assumes that the body is JSON, and automatically parses it into a dictionary at request.data
    email = request.data['email']
    password = request.data['password']
    user = authenticate(username=email, password=password)
    if user is not None:
      if user.is_active:
        try:
          # access the base request, not the DRF request
          # this starts a login session for this user
          login(request._request, user)
          trainer = Trainer.objects.all().get(email=email)
        except Exception as e:
          print('except')
          print(str(e))
        return JsonResponse({'success': True, 'trainer_id': trainer.id}) # Redirect to a success page.
      else:
        return JsonResponse({'success': False, 'error': 'not active'})
        # Return a 'disabled account' error message
    else:
        return JsonResponse({'success': False, 'error': 'no user'})
        # Return an 'invalid login' error message.

@api_view(['POST'])
def log_out(request):
  logout(request)
  return JsonResponse({'success':True})

@api_view(['GET'])
def who_am_i(request):
  # Make sure that you don't send sensitive information to the client, such as password hashes
  # raise Exception('oops')
  if request.user.is_authenticated:
    data = serializers.serialize("json", [request.user], fields=['email', 'username'])

    return HttpResponse(data)
  else:
    return JsonResponse({'user': None})

########################################################################################################
# AJAX                                                                                                 #
########################################################################################################

@api_view(['GET'])
def pokemon(request):
  # Checks if the user has a pokemon associated with their account or not
  if request.method == 'GET':
    print(request.user)
    trainer = Trainer.objects.all().get(email = request.user)
    try:
      pokemon = Pokemon.objects.all().get(trainer_id = trainer.id)
      return JsonResponse(model_to_dict(pokemon))
    except Exception as e:
      return JsonResponse({'success': False, 'error': 'Trainer has not adopted a pokemon'})

@api_view(['POST'])
def pokemon_id(request, id, trainer_id):
  if request.method == 'POST':
    # Calls pokeapi
    response = requests.get(f'https://pokeapi.co/api/v2/pokemon/{id}')
    data = response.json()
    name = data['name']
    sprite = data['sprites']['front_default']
    
    # Calls pkmnapi using a shell command because I couldn't figure out how to do it using python requests module
    # apikey is in plaintext for ease of grading. There is a lot of set up for this api and it'll be a lot easier for instructors if they just use my account
    os.system(f"curl -X GET -H 'Authorization: Bearer tH3x7Xmhiw7TdqI0vIRXfAiE6pXoCn8JHGssP71D0CTc0bGH66uNjUtx2iS1e6mk' -H 'Accept: audio/wav' -o {path}/media/cries/pokemon{id}.wav  https://api.pkmnapi.com/v1/pokemon/cries/{id}")
    
    try:
      # uses info from both APIs to create a pokemon in the database for that user
      # note that the 'cry' col isn't uploading a file, rather a path to where the API call saves the file
      pokemon = Pokemon(species=name, sprite=sprite, happiness=10, hunger=10, cry=f'media/cries/pokemon{id}.wav', trainer_id=trainer_id)
      pokemon.full_clean()
      pokemon.save()
    except Exception as e:
      return JsonResponse({'success': False, 'error': 'Trainer already has a pokemon'})
    return JsonResponse({'success': True})

@api_view(['GET', 'PUT'])
def last_fed(request, id):
  # get pokemon from database
  pokemon = Pokemon.objects.all().get(id=id)
  
  if request.method == 'GET':
    # return how long it has been (in hours) since the pokemon was last fed
    now = timezone.now()
    time_diff = now - pokemon.last_fed
    time_diff_seconds = time_diff.total_seconds()
    time_diff = divmod(time_diff_seconds, 3600)[0]

    return JsonResponse({'time_diff': str(time_diff)})

  if request.method == 'PUT':
    body = json.loads(request.body)
    pokemon.hunger = int(body['current_hunger'])
    pokemon.happiness = int(body['current_happiness'])
    # when pokemon is fed, update their respective columns in the databse
    pokemon.last_fed = timezone.now()
    if pokemon.hunger + 4 > 10:
      pokemon.hunger = 10
    else:
      pokemon.hunger += 4
    pokemon.full_clean()
    pokemon.save()
    return JsonResponse(model_to_dict(pokemon))

@api_view(['PUT'])
def play(request, id):
  pokemon = Pokemon.objects.all().get(id=id)
  
  body = json.loads(request.body)
  pokemon.happiness = int(body['current_happiness'])
  correct = body['correct']
  
  if correct == 'Correct':
    if pokemon.happiness + 2 > 10:
      pokemon.happiness = 10
    else:
      pokemon.happiness += 2
  else:
    if pokemon.happiness - 1 < 0:
      pokemon.happiness = 0
    else:
      pokemon.happiness -= 1
  pokemon.full_clean()
  pokemon.save()
  return JsonResponse(model_to_dict(pokemon))

@api_view(['DELETE'])
def release(request, id):
  pokemon = Pokemon.objects.all().get(id=id)
  species = pokemon.species
  pokemon.delete()
  return JsonResponse({f'{species}': 'Released!'})
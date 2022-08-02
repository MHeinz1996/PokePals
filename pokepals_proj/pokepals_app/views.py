from django.forms.models import model_to_dict
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from .models import Trainer, Pokemon
import requests, json, datetime

def index(request):
  index = open('static/index.html').read()
  return HttpResponse(index)
  
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
    print('user?')
    print(user.email)
    print(user.password)
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


@api_view(['GET'])
def pokemon(request):
  if request.method == 'GET':
    print(request.user)
    trainer = Trainer.objects.all().get(email = request.user)
    try:
      pokemon = Pokemon.objects.all().get(trainer_id = trainer.id)
      return JsonResponse(model_to_dict(pokemon))
    except Exception as e:
      return JsonResponse({'success': False, 'error': 'Trainer has not adopted a pokemon'})

    
  return HttpResponse('test')

@api_view(['POST'])
def pokemon_id(request, id, trainer_id):
  if request.method == 'POST':
    response = requests.get(f'https://pokeapi.co/api/v2/pokemon/{id}')
    data = response.json()
    name = data['name']
    sprite = data['sprites']['front_default']
    print(f"name = {name}")
    print(f"sprite url = {sprite}")
    print(f"pokemon id = {id}")
    print(f"trainer id = {trainer_id}")

    # try:
    #   pokemon = Pokemon(species=name, sprite=sprite, happiness=10, hunger=10, last_fed=datetime.now(), trainer_id=trainer_id)
    #   print(model_to_dict(pokemon))
    #   def get_cry(id):
    #     headers = {
    #         'Authorization': 'Bearer tH3x7Xmhiw7TdqI0vIRXfAiE6pXoCn8JHGssP71D0CTc0bGH66uNjUtx2iS1e6mk',
    #         'Accept': 'audio/wav',
    #     }
    #     response = requests.get(f'https://api.pkmnapi.com/v1/pokemon/cries/{id}', headers=headers)
    #     return response

    #   pokemon.cry = get_cry(id)

    #   pokemon.full_clean()
    #   pokemon.save()
    # except Exception as e:
    #   return JsonResponse({'success': False, 'error': 'Could not create pokemon'})
    
    return JsonResponse({'success': True})
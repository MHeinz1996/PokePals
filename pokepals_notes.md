# HomePage
- When user navigates to PokePals site, they are greeted with a log in form
- There is a link to Sign Up if the user has not already made an account.

## Sign Up
- user can enter an email and password to sign up
- will have to perform some kind of try/catch handling if the user tries to enter an email that already exists
- when user successfully creates an account, redirect them to the log in page so that they can log in
- WHEN DOING ANY KIND OF CSRF FUNCTION, NEED TO RELOAD THE PAGE AFTER EXPENDING CSRF TOKEN TO GENERATE A NEW TOKEN FOR LATER USE

## Login In
- user can enter an email and password to log in
- will have to perform some kind of try/catch handling if the user logged in successfully
- if logged in successfully, route to '/#/game'

## Play
- When routed to '/#/game', frontend will query backend to see if user has a pokemon yet
- if user does not have a pokemon, user will be served an adoption page that allows them to select a pokemon from the origial 151 to adopt
  - When a pokemon is selected, frontend will send the selection to the backend, and the backend will query the appropriate APIs to gather that pokemon's data
  - a Pokemon Object will then be created for that user and stored in the database
  - after that has been settled, the frontend will route to the pokemon page where the user can begin interacting with their pokemon
- If the user has a pokemon adopted already, the backend will pull that pokemon's object instance and serve it to the front end (which pokemon, hunger and happiness levels, etc)
- User will have options like `Feed`, `Play`, `Status`, etc. that they can use to interact with the pokemon and take care of it.

## Log Out
- When the user is done taking care of their pokemon for that session, they can select `Quit`
- `Quit` will send the current pokemon status levels (hunger, happiness, last_fed, etc) to the backend so that it can update the database
- User will be redirected to the login page

<p>&nbsp;</p>
<p>&nbsp;</p>

# To get pokemon cries, use this syntax:
curl:
```bash
curl -X GET -H 'Authorization: Bearer tH3x7Xmhiw7TdqI0vIRXfAiE6pXoCn8JHGssP71D0CTc0bGH66uNjUtx2iS1e6mk' -H 'Accept: audio/wav' -o /home/michael/VSCode/Code_Platoon/Personal_Project/pokepals_proj/static/cries/pokemon_{id}.wav  https://api.pkmnapi.com/v1/pokemon/cries/{id}
```
<p>&nbsp;</p>

** Test this first | Unsure if response will be returned as a file or as binary | Might need to ask Instructors for help **

<p>&nbsp;</p>

python:
```python
import requests
# when implemented, Bearer token will be in .env file

def get_cry(id):
  headers = {
      'Authorization': 'Bearer tH3x7Xmhiw7TdqI0vIRXfAiE6pXoCn8JHGssP71D0CTc0bGH66uNjUtx2iS1e6mk',
      'Accept': 'audio/wav',
  }

  response = requests.get(f'https://api.pkmnapi.com/v1/pokemon/cries/{id}', headers=headers)
  return response

# add cry to pokemon database obj
pokemon = Pokemon(...)
pokemon.cry = get_cry(id)
```


Django Model:
```python
class Pokemon(models.Model):
  # file will be uploaded to MEDIA_ROOT/cries
  cry = models.FileField(upload_to='cries/')
```

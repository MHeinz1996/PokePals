# HomePage
- When user navigates to PokePals site, they are greeted with a log in form
- There is a link to Sign Up if the user has not already made an account.

## Sign Up
- user can enter an email and password to sign up
- will have to perform some kind of try/catch handling if the user tries to enter an email that already exists
- when user successfully creates an account, redirect them to the log in page so that they can log in
- WHEN DOING ANY KIND OF CSRF FUNCTION, NEED TO RELOAD THE PAGE AFTER EXPENDING CSRF TOKEN TO GENERATE A NEW TOKEN FOR LATER USE

<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

# To get pokemon cries, use this syntax:
curl:
```bash
curl -X GET -H 'Authorization: Bearer tH3x7Xmhiw7TdqI0vIRXfAiE6pXoCn8JHGssP71D0CTc0bGH66uNjUtx2iS1e6mk' -H 'Accept: audio/wav' -o /home/michael/VSCode/Code_Platoon/Personal_Project/pokepals_proj/static/cries/pokemon_{id}.wav  https://api.pkmnapi.com/v1/pokemon/cries/{id}
```
<p>&nbsp;</p>

** Test this first **
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

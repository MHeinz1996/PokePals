# Personal Project

## [Requirements](https://docs.google.com/spreadsheets/d/13ORPURoJ_l57XPTRVydIpFdSs68ZoSeOJ_92LfeySoA/edit#gid=0)
- Django Backend
  - 2 external APIs
- PostgreSQL DB
  - Min 2 models
  - Min 2 CRUD operations with those models
  - User Authentication
- React Frontend
  - Proper styling and site navigation

# Tamagotchi-like Pokémon Game

## About
A [tamagotchi](https://en.wikipedia.org/wiki/Tamagotchi)-like game where you can befriend and take care of your own Pokémon.

## Functionality
  - Adopt a Pokémon
  - Play with Pokémon to make it happy
    - playing with Pokémon will be similar to how it was in tamagotchi
      - to the left of the Pokémon, a number from 1-9 will appear
      - the player needs to guess if the next number will be higher or lower than the previous number
      - if they get the answer correct, happiness increases by 1 star
      - if they get the answer wrong, happiness decreases by half a star
      - maybe in a future release, change game to be "Who's that Pokemon?!"
  - Feed Pokémon when it is hungry
    - every hour not fed, hunger level decreases by half a star
    - every hour that hunger == 0, happiness decreses by 1 star
    - if Pokémon has 4 or more stars in its belly, it won't be hungry, and won't eat
  - If Pokémon's happiness is 0 stars for over 72 hours, Pokémon runs away due to mistreatment
  - Clicking on the Pokémon will play that Pokémon's cry sound
  
## APIs
- [Pokeapi](https://pokeapi.co/)
  - get Pokémon list and sprites
- [pkmnapi](https://www.pkmnapi.com/endpoints/pokemon-cries/#post-pokemon-cry)
  - get a Pokémon's cry

## Database
### Models:
- Trainer (AbstractUser)
  - used for authentication
  - used to display that specific user's Pokémon
- Pokemon
  - species (ex. Pikachu. Pulled from pokeapi)
  - happiness (int from 0-10 to represent stars. ex. happiness:9 == 4.5-stars == very happy)
  - hunger (int from 0-10 to represent stars. ex. hunger:0 == 0-stars == starving)
  - last_fed (datetime to be used to calculate hunger)
  - cry (sound that the pokemon makes. Pulled from pkmnapi, stored as a path to where the .wav file is downloaded to)
  - sprite (url of pokemon image)
  - trainer (foreignkey Trainer, One-to-One relationship)

### CRUD:
- CREATE
  - User adopts a Pokémon to take care of
- READ
  - When user logs in, frontend will get Pokémon's data from backend and set appropriate states in the frontend
- UPDATE
  - When the user interacts with their pokemon, frontend will send current game data to backend
  - backend will then update the Pokémon's data
- DELETE
  - User can decide to release their Pokémon forever
  - Pokémon can run away
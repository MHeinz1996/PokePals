# Personal Project

## Requirements
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
      - if they get the answer correct, happiness increases by 1
      - if they get the answer wrong, happiness decreases by 1
  - Feed Pokémon when it is hungry
    - every hour not fed, hunger level decreases by 1
    - every hour that hunger == 0, happiness decreses by 2
  - If Pokémon's hunger and happiness are both 0, Pokémon runs away due to mistreatment
  
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
  - species (ex. Pikachu)
  - nickname (optional)
  - happiness (int from 0-10 to represent stars. ex. happiness:9 == 4.5-stars == very happy)
  - hunger (int from 0-10 to represent stars. ex. hunger:0 == 0-stars == starving)
  - trainer (foreignkey AppUser)

### CRUD:
- CREATE
  - User selects a Pokémon to take care of
- READ
  - When user logs in, frontend will get Pokémon's data from backend and set appropriate states in the frontend
- UPDATE
  - When the user saves their game, frontend will send current game data to backend
  - backend will then update the Pokémon's data
- DELETE
  - User can decide to release their Pokémon forever
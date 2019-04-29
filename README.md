# SPACE FINDER:
* A React Native app that finds the privately owned public spaces in New York City (such as Elevated Acre).

* Have you ever stumbled upon a public space inside a building, or directly outside?
* Did you wonder how many more of these spaces you were missing out on?


* With Space Finder, you can see where you are in relation to these spaces, and find the addresses of these previously unknown locations!
* Compatible with iOS and Android

#INSTALLING:
* Download the expo app
* Clone this project to your local machine

* Run 'npm install'
* You will need to have postgreSQL open, create your own database named "space-finder", and run 'npm run seed'
* You will also need to go into redux/rootReducer and in the getSpaces thunk you will need to edit 'http://**172.16.21.191**:1337/api/spaces' to your ip address
* run 'Expo start' and in a separate terminal run 'npm run start-server'

#TECH USED:
* React Native - Expo
* Node.js
* Redux
* Express
* PostgreSQL
* MapQuest geocoding api
* NYC gov data


![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)

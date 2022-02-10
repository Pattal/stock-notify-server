## StockNotify Server&Scraper
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Server waypoints](#server-waypoints)
* [Database](#database)

## General info
The project was an engineer work, therefore detailed information about it can be found in the work available on the platform. The server application is divided into two parts. One of them (scraper) is responsible for obtaining stock exchange announcements from the PAP website and the names of companies listed on the WSE, and for placing this information in the database. The second part is an ordinary server with access points through which the application can obtain information from the database. 
	
## Technologies
Project is created with:
* Axios": "^0.19.2"
* Body-parser: "^1.19.0"
* Cheerio: "^1.0.0-rc.3"
* Express.js: "^4.17.1"
* Mysql: "^2.18.1"
  
	
## Setup
To run this project, you must have a local relational database. Its copy is in the repository (stocknotify.sql). Nextly have to install it locally using npm:

```
$ npm install
$ node server.js or node scraperInfo.js
``` 

## Server waypoints
* /info - returns the latest messages
* /company - returns all companies in database
* /info/:id - returns all info for specific company

## Database
Clipping of some records from the database:
![alt text](https://github.com/Pattal/stock-notify-server/blob/master/Images/one.PNG)
![alt text](https://github.com/Pattal/stock-notify-server/blob/master/Images/two.PNG)

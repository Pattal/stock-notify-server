const express = require('express')
const app = express();
const port = 3000;
const cheerio = require("cheerio");
const axios = require('axios');

var mysql = require('mysql');

//Add the credentials to access your database
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'stocknotify'
});

getData = () => {
    axios.get('http://infostrefa.com/infostrefa/pl/spolki')
        .then(res => {
            const $ = cheerio.load(res.data);
            let info = [];

            connection.connect(function(err) {
                // in case of error
                if(err){
                    console.log(err.code);
                    console.log(err.fatal);
                }
            });

            //$query = "INSERT INTO info (company, title, content, url, date, number) VALUES ?"
            //$query = "INSERT INTO info (company, title, content, url, number, date) VALUES('CDP', 'Cyperpunk', 'Przesuwamy zaś', 'www.cdp.pl', '20/2021')";
            //$query = "INSERT INTO info (company, title, content, url, number, time) VALUES ?";
            const company1 = 'Abak SA';
            $query = "SELECT id from spolki WHERE company='" + company1 + "'";
            $('tr').each((index, el) => {
                
                let company = $(el).find('td:nth-child(1)').text().trim();
                let shortName = $(el).find('td:nth-child(2)').text().trim();
                let ticker = $(el).find('td:nth-child(3)').text().trim();
                let industry = $(el).find('td:nth-child(5)').text().trim();
                
                let info = [[
                    company,
                    shortName,
                    ticker,
                    industry
                ]];

                

                    

                        connection.query($query, function(err,result) {
                            if(err){
                                console.log("An error ocurred performing the query.");
                                return;
                            }
                        
                            console.log("Query succesfully executed: ", result);
                        });
                    
                    

                   
            });

            
            //console.log(info[2]);
        })

        return 0;
}







getData();

//setInterval(getData, 5000);  
const express = require('express')
const app = express();
const port = 3000;
const cheerio = require("cheerio");
const axios = require('axios');

var mysql = require('mysql');

// Add the credentials to access your database
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'stocknotify'
});

getData = () => {
    axios.get('http://biznes.pap.pl/pl/reports/espi/all,0,0,0,1')
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
            $query = "INSERT INTO info (company, title, content, url, number, date) VALUES ?";

            
            $('.inf').each((index, el) => {
                
                

                let time = $(el).children().first().text().trim();
                let number = $(el).find('td:nth-child(2)').text().trim();
                let company = $(el).find('td:nth-child(3)').text().trim()
                let title = $(el).children().last().text().trim();
                let url = $(el).find('td:nth-child(4)').find('a').attr('href');

                (async () => {
                    let content = await getInfo(url);
                    let info = [[
                        company,
                        title,
                        content,
                        url,
                        number,
                        time
                        
    
                    ]];

                    //console.log(info[index])
                    connection.query($query, [info], function(err) {
                        if(err){
                            console.log("An error ocurred performing the query.");
                            return;
                        }
                    
                        console.log("Query succesfully executed: ");
                    });
                    
                    
                  })()


            });

            
            //console.log(info[2]);
        })
}


async function getInfo (link) {
    let content = [];
    
    let info = await axios.get(link)
            .then( res => {
                const $ = cheerio.load(res.data);
                
                let i = 0;
                $('.nTekst').each((index, el) => {
                    
                    content[index] = $(el).find('td:nth-child(2)').text().trim();
                    //console.log(content[index]);
                });

                //console.log(content[10]);
                return content[10];
            })

//console.log(info);
return info;
}


getData();

//setInterval(getData, 5000);           


 
            

            
// getInfo = (link) => {
//     axios.get('http://biznes.pap.pl/espi/pl/reports/view/2,457236')
//             .then( res => {
//                 const $ = cheerio.load(res.data);
//                 const content = '';
//                 let i = 0;
//                 $('tr').each((index, el) => {
//                     if($(el).children().text().trim() === 'Treśc raportu:') {
//                         while($(el).next().children().text().trim() !== '_pełna nazwa emitenta_' ){
//                             //     i++;
//                             //     console.log(i)
        
//                             }
//                     }
                    
                    

//                     // if($(el).children().text().trim().toLocaleLowerCase() == 'treść raportu:' ) {
                        
//                     //     content += $(el).children().text().trim() + '/n';
                        
//                     // }
//                 });


//             })
// }
   


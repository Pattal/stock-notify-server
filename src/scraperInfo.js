const express = require('express')
const app = express();
const port = 3000;
const cheerio = require("cheerio");
const axios = require('axios');

var mysql = require('mysql');

// Add the credentials to access your database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stocknotify'
});

getData = () => {
    axios.get('http://biznes.pap.pl/pl/reports/espi/all,0,0,0,1')
        .then(res => {
            const $ = cheerio.load(res.data);
            let info = [];

            connection.connect(function (err) {
                // in case of error
                if (err) {
                    console.log(err.code);
                    console.log(err.fatal);
                }
            });

            //$query = "INSERT INTO info (company, title, content, url, date, number) VALUES ?"
            //$query = "INSERT INTO info (company, title, content, url, number, date) VALUES('CDP', 'Cyperpunk', 'Przesuwamy zaś', 'www.cdp.pl', '20/2021')";
            $query1 = "INSERT INTO info (name, title, content, url, number, time, id_company, type) VALUES ?";


            $('.inf').each((index, el) => {

                let time = $(el).children().first().text().trim();
                let number = $(el).find('td:nth-child(2)').text().trim();
                let name = $(el).find('td:nth-child(3)').text().trim()
                //$query2 = "SELECT id from spolki WHERE company LIKE'" + company + "%'";
                let idCompany = [] ;


                let title = $(el).children().last().text().trim();
                let url = $(el).find('td:nth-child(4)').find('a').attr('href');
                let type = getType(title);
                console.log(type);



                (async () => {

                    $query2 = "SELECT id from spolki WHERE name LIKE'" + name + "%'";
                    
                    connection.query($query2, function (err, rows, fields) {
                        if (err) {
                            console.log("An error ocurred performing the query.");
                            return;
                        }


                        //console.log("Query succesfully executed: ", rows.length, company);
                        
                        if(rows.length){
                            
                            let id = rows[0].id;
                            idCompany.push(id);
                            
                        }
                        else{
                            
                            let id = 0;
                            idCompany.push(id);
                        }
                        
                        
                    });
                    let content = await getInfo(url);



                    //console.log('czekaj');
                    let info = [[
                        name,
                        title,
                        content,
                        url,
                        number,
                        time,
                        idCompany[0],
                        type



                    ]];

                    //console.log(info);

                   console.log(info[index])
                    connection.query($query1, [info], function(err) {
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

    return 0;
}


// $query2 = "SELECT id from spolki WHERE company LIKE'" + company + "%'";
// let idCompany = await connection.query($query2, function (err, rows, fields) {
//     if (err) {
//         console.log("An error ocurred performing the query.");
//         return;
//     }


//     console.log("Query succesfully executed: ", rows[0].id);
//     let id = rows[0].id;
//     console.log(id);
//     return (id);
// });



// async function getId(company) {
//     $query2 = "SELECT id from spolki WHERE company LIKE'" + company + "%'";
//     const result = await connection.query($query2, (err, rows, fields)=> {
//         return rows;
//     });

//     console.log(result[0]);
// }





async function getInfo(link) {
    let content = [];

    let info = await axios.get(link)
        .then(res => {
            const $ = cheerio.load(res.data);

            let i = 0;
            $('.nTekst').each((index, el) => {

                content[index] = $(el).find('td:nth-child(2)').text().trim();
                //console.log(content[index]);
            });

            //console.log(typeof content[10]);
            if(typeof content[10] == undefined){
                return ' ';
            }else{
                return content[10];
            }
            
        })

    //console.log(info);
    return info;
}

getType = (title) =>{
    

    let type = '';

    if(title.toLowerCase().includes('raport')){
        type = 'raport';
        
    }
    else if(title.toLowerCase().includes('walne')){
        type = 'nza';
    }
    
    else if(title.toLowerCase().includes('dywiden')){
        type = 'dywidenda';
    }
    else if(title.toLowerCase().includes('szacunkow')){
        type = 'wyniki';
    }
    else{
        type = 'null';
        
    }
    //console.log(type);

    return type;
    
}

getData();

// type = getType('ACTION SA W RESTRUKTURYZACJI (45/2020) Informacja o szacunkowych obrotach Grupy Kapitałowej Action S.A.');
// console.log('tu',type);

//setInterval(getData, 5000);           









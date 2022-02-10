const express = require('express');
const app = express();

const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '',
    database : 'stocknotify'
});


const server = app.listen(4545, () => {
    const host = server.address().address;
    const port = server.address().port;

});

con.connect((err) =>{
    // in case of error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
});

app.get('/users',(req, res) => {
    con.query('SELECT * FROM info ORDER BY `date` DESC, `time` DESC LIMIT 50', (err, rows, fields) => {
        if(err) console.log(err);
        else {
            //console.log(rows);
            res.send(rows);
            
        }
    })
});

app.get('/company',(req, res) => {
    con.query('SELECT * FROM spolki', (err, rows, fields) => {
        if(err) console.log(err);
        else {
            //console.log(rows);
            res.send(rows);
            
        }
    })
});

app.get('/info/:id', (req, res) => {

    const id = req.params.id;
    $query = 'SELECT * from info, spolki WHERE info.id_company=spolki.id AND spolki.id =' + id + ' ORDER BY `date` DESC, `time` DESC';
    con.query($query, (err, rows, fields) => {
        if(err) console.log(err);
        else {
            //console.log(rows);
            res.send(rows);
            
        }
    })
    
  });

  app.get('/query/:id', (req, res) => {

    const id = req.params.id;
    console.log(id);
    $query = 'SELECT info.id, info.name, info.title, info.content, info.url, info.time, info.date, info.number, info.id_company FROM spolki, info WHERE ' + id + ' AND info.id_company=spolki.id ORDER BY `date` DESC, `time` DESC';
    console.log($query);
    
    con.query($query, (err, rows, fields) => {
        if(err) console.log(err);
        else {
            //console.log(rows);
            res.send(rows);
            
        }
    })
    
  });
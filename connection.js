// Get the mysql service
var mysql = require('mysql');

// Add the credentials to access your database
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'stocknotify'
});

// connect to mysql
connection.connect(function(err) {
    // in case of error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
});

// Perform a query
//$query = 'SELECT * from info';
$query = "INSERT INTO info (company, title, content, url, number) VALUES('CDP', 'Cyperpunkl', 'Przesuwamy zaś', 'www.cdp.pl', '20/2021')";

let url = 'www.cdp.pl';
//$query = "if not exists (select * from info where info.url = 'www.cdp.pl') INSERT INTO info (company, title, content, url, number) VALUES('CDP', 'Cyperpunk', 'Przesuwamy zaś', 'www.cdp.pl', '20/2021')";

$sql = "BEGIN IF NOT EXISTS (SELECT * FROM info WHERE info.url = 'www.cdp.pl') BEGIN INSERT INTO info (company, title, content, url, number) VALUES ('CDP', 'Cyperpunk', 'Przesuwamy zaś', 'www.cdp.pl', '20/2021') END END ";



connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        return;
    }

    console.log("Query succesfully executed: ", rows);
});

// Close the connection
connection.end(function(){
    // The connection has been closed
});

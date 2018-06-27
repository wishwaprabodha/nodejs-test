var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'wishwa',
    password: 'Egxduvwz@2116',
    database: 'nodetest'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected !");
});

app.set('view engine', 'pug');
app.set('views', './views');


app.use(bodyParser.urlencoded());


app.get('/customer/:id', function (req, res) {
    //connection.connect();
    var id = req.params.id;
    var query = 'select * from customer where id=' + id;
    connection.query(query, function (err, results, f) {
        res.end(results);
        //connection.end();
    });
});


app.get('/customer', function (req, res) {
    //connection.connect();
    var customerList = [];
    var i = 0;
    var query = 'select * from customer';
    connection.query(query, function (err, results) {
        res.render('first_view', {data: results});

    });
});
app.post('/customer', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var age = req.body.age;
    var address = req.body.address;
    //console.log("address: " + address);
    var query = "insert into customer values('" + id + "','" + name + "','" +
        age + "','" + address + "');";
    connection.query(query, function (err, result) {
        if (err) throw err;
    });

});

app.listen(3000, function () {
    console.log("Server Running!");
});



var express=require('express');
var mysql = require('mysql');
var bodyParser=require('body-parser');
const mysqlssh = require('mysqlssh');
const fs = require('fs');
var app=express();

 
mysqlssh.connect(
    {
        host: '129.154.102.73',
        user: 'opc',
        privateKey: fs.readFileSync(process.env.HOME + '/home/wishwa/Downloads/IPAY_MICROSERVICE_TESTING_PRIVATE_KEY.key')
    },
    {
        host: '129.154.102.73',
        user: 'root',
        password : '',
        database : 'nodetest'
    }
)

/*var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodetest'
});
*/
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected !");
  });


app.set('view engine', 'pug');
app.set('views', './views');

app.get('/customer/:id', function(req, res){
    //connection.connect();
    var id=req.params.id;
    var query='select * from customer where id='+id;
    connection.query(query,function(err,results,f){
    res.end(JSON.stringify(results));   
    //connection.end(); 
 });
}); 


app.get('/customer',function(req,res){
    //connection.connect();
    var customerList = [];
    var query='select * from customer';
    connection.query(query,function(err,results,f){
        console.log(results);
        for (var i in results) {
        // Create an object to save current row's data
        
        var person = {
            id:results[i].fid,
            name:results[i].fname,
            age:results[i].fage,
            address:results[i].faddress
                };
        customerList.push(person);
            }     
        res.render('first_view', {"customer": customerList});

    //res.end(JSON.stringify(results));   
    //connection.end(); 
    });
});

app.post('/customers',function(req,res){
    //connection.connect();
    //res.render('first_view');
    var query="insert into customer (id, name, age, address) values (14,"+"wishwa"+",23,"+"panadura"+");";
    connection.query(query,function(err,result,f){
        if(err) throw err;
        app.use(bodyParser.JSON);
        //res.send(result);
        res.end();
    });
    //connection.end();
});

app.listen(3000,function(){
    console.log("Server Running!");
});


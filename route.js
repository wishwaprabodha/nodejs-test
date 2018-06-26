var express=require('express');
var mysql = require('mysql');
var bodyParser=require('body-parser');
var app=express();

// create application/json parser
var jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodetest'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected !");
  });


app.set('view engine', 'pug');
//app.set('views', './views');

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
    var i=0;
    var query='select * from customer';
    connection.query(query,function(err,results,f){
    console.log(results);
      for (i=0;i<5;i++) {
        // Create an object to save current row's data
        var person = {
            "id":results[i].id,
            "name":results[i].name,
            "age":results[i].age,
            "address":results[i].address
                };
        customerList.push(person);
        }
        //res.render('first_view', {person});
        res.end(JSON.stringify(results));   
    //connection.end(); 
    });
});
app.post('/customer',jsonParser,function(req,res){
    var id=req.body.id;
    var name=req.body.name;
    var age=req.body.age;
    var address=req.body.address;
    console.log("address: "+address);
    var query="insert into customer values('"+id+"','"+name+"','"+
    age+"','"+address+"');";
    connection.query(query,function(err,result,f){
        if(err) throw err;    
         });

    });

app.listen(3000,function(){
    console.log("Server Running!");
});



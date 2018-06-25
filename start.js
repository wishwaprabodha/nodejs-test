
var mysql = require('mysql');
var express=require('express');
//var path=require('path');
var app=express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port:3306,
  database:"nodetest",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected !");
});


app.get('/customers',function(req,res){
  var query="select * from customers";
  db.query(query,function(err,result,f){
      console.log("Result is: "+result);
      //res.end(JSON.stringify(result));    
  });
  
});

module.exports=con;
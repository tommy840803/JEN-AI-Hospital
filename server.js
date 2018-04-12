var express = require("express");
var server = new express();
var bodyParser = require('body-parser');


// require db config
var pg = require('pg');
var config = require('./config');

//DB 連接
var mysql = require('mysql');

var con = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

//設定檔案路徑在CH資料夾下面
server.use(express.static(__dirname+"/public"));
server.use(express.urlencoded());


//回傳是否成功 1成功 2失敗
var text1 = '[{"isSucssess":"success"}]';
var text2 = '[{"isSucssess":"fail"}]';
var obj1 = JSON.parse(text1);
var obj2 = JSON.parse(text2);


//設定session的大小
//var session = require('express-session'); //利用session暫存使用者資料
//server.use(session({ secret: 'yuan', cookie: { maxAge: 60000 }})); 

//Start Server
server.listen(8080, function(err){
  if(err)
    console.log(err.message);
  else{
    con.connect();
    console.log("Server is running on port: 8080\nDB is connected");
  }
    
});

//根目錄
server.get("/", function(req, res, next){
  //回傳至login.html的頁面
	res.redirect("/CH.html");
});

//登入
server.post("/login", function(req, res, next){
  
  //紀錄現在登入帳號
  nowLoginAccount = req.body.account;
  
  //檢測帳密
  console.log("email= "+req.body.account+"\npassword= "+req.body.password);
  //從資料庫撈資料
    con.query("SELECT * FROM test2 where account='"+req.body.account+"'AND password='"+req.body.password+"';", function (err, result, fields) {
      if(result != ""){
        console.log("login成功");
        console.log(result);
        res.json(obj1);
      }else{
        res.json(obj2);
        console.log(err);
      }
      
    });


});

//註冊
server.post("/register", function(req, res, next){

    var sql = "INSERT INTO test2 (account,password,name,number,address,phone) values('"+req.body.account+"','"+req.body.password+"','"+req.body.name+"','"+req.body.number+"','"+req.body.address+"','"+req.body.phone+"');"
    console.log(sql);
    con.query(sql, function (err, result) {
      if(err){
        res.json(obj2);
      }else{
        console.log("1 record inserted");
        res.redirect("/CH.html");
      }
      
      
    });


});


//Member.html 拿使用者資料
server.post("/getUserImfor", function(req, res, next){
    var sql = "SELECT * FROM test2 where account='"+req.body.account+"';"
    con.query(sql, function (err, result) {
      if(err){
        res.json(obj2);
      }else{
        console.log("query success");
        res.json(result);
      }
    });
});

//系統滿意度 -> 星星
server.post("/starRate", function(req, res, next){
  
    var sql = "UPDATE test2 SET userrate='"+req.body.starRate+"' WHERE account='"+req.body.account+"';";
    con.query(sql, function (err, result) {
      if(err){
        res.json(obj2);
      }else{
        console.log("/starRate record updated");
        res.json(obj1);
      }
      
    });
    
});


//醫院服務滿意度 -> 愛心
server.post("/loveRate", function(req, res, next){
  
    var sql = "UPDATE test2 SET hostipalrate='"+req.body.loveRate+"' WHERE account='"+req.body.account+"';";
    con.query(sql, function (err, result) {
      if(err){
        res.json(obj2);
      }else{
        console.log("/loveRate record updated");
        res.json(obj1);
      }
      
    });
    
});





//紀錄現在登入帳號
var nowLoginAccount;

//搜尋車位
server.get("/search",function(req, res, next){

//從資料庫撈資料
  con.connect(function(err) {
    if (err){
        throw err
    };
     
  con.query("SELECT address FROM test2 where name='"+nowLoginAccount+"';", function (err, result, fields) {
      if(err){
        res.json(obj2);
        console.log(err);
      }else{
       //回傳定位數值
       var text = '[{"address":"'+result.firstname+'"}]';
       var obj  = JSON.parse(text1);
       res.json(obj);
      }
    });
  });
});        
        

//"insert into test2(account,password,name,number,address,phone) values('"+req.body.account+"','"+req.body.password+"','"+req.body.name+"','"+req.body.number+"','"+req.body.address+"','"+req.body.phone+"');"


//車輛定位
server.post("/location", function(req, res, next){
  
    console.log("location: "+req.body.address);
    console.log("account: " +req.body.account);
    var sql = "UPDATE test2 SET location='"+req.body.address+"' WHERE account='"+req.body.account+"';";
    con.query(sql, function (err, result) {
      console.log(result);
      if(err){
        res.json(obj2);
      }else{
        res.json(obj1);
        console.log("/location record updated");
        
      }
    });

});

//後台傳給前台的定位值
server.post("/search", function(req, res, next){
  
    //檢測帳密
    console.log("number= "+req.body.number);

    //搜尋車位
    con.query("SELECT account,name,location FROM test2 where number='"+req.body.number+"';", function (err, result, fields) {
 
      if(err){
        res.json(obj);
        console.log(err);
      }else{
        console.log(result);
        res.json(result);
      }
    });


});


//沒有的頁面顯示 Not found
server.get("*", function(req, res, next){
	res.end("Not found page");
});


//var str="B2FA2";
// var str;

//拿到的值如下, /address的路徑在依照後台的路徑修改
// var address="";
// $.getJSON("/address", function(result){ // -> result: 全部拿到的數值
//     str=result.address; // ->讓str=address
// });

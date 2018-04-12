var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "c9"
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "insert into test2(account,password,name,number,address,phone) values('twww125@gmail.com','1234','張WW','Mrr-3255','台中市霧峰區','0911958963');"
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });
con.connect(function(err) {
  if (err) throw err;
  var sql = "UPDATE carhere SET location='B2A205' WHERE account='tom125@gmail.com'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});


//定位
server.post("/location", function(req, res, next){
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "UPDATE carhere SET location='B2A205' WHERE account='tom125@gmail.com'";
    con.query(sql, function (err, result) {
      if(err){
        res.json(obj2);
      }else{
        console.log("1 record inserted");
        res.json(obj1);
      }
      
      
    });
  });

});



//後台傳給前台的定位值
server.post("/login", function(req, res, next){
  
  //檢測帳密
  console.log("email= "+req.body.account+"\npassword= "+req.body.password);
  //從資料庫撈資料
  con.connect(function(err) {
    if (err){
        throw err
    };
     
    //"SELECT * FROM carhere where account="+req.body.account
    var acc ="chuliu326@gmail.com";
    con.query("SELECT * FROM carhere where account='"+acc+"';", function (err, result, fields) {
      if(err){
        res.json(obj2);
        console.log(err);
      }else{
        console.log(err);
        res.json(obj1);
      }
    });
  });

});
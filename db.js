//this file created database connection
// this page created for pages connection.
//use model concept (you can use any where).


//mysql module
 let mysql=require("mysql");

//  database connection

 let conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"stucrudapp"
 });

 conn.connect((err)=>{
    if(err){
        console.log("database connection failed");
    }
    else{
        console.log("Database is connection");
    }
 }); 

//  this is module
 module.exports=conn;
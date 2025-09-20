// ================library================
let express=require("express");



//=========midel where======
let bodyParser=require("body-parser");


//=============Database module============
let db=require("./db");
const { render } = require("ejs");


//==============import libarary============
let app=express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


app.use(express.static("public")); 

// =================navbar=================
// ---return home page as response to clients---
app.get("/",(req,res)=>{
    res.render("nav.ejs");
});



//===============Home page=================

app.get("/home",(req,res)=>{
    res.render("home.ejs");
});




//==============Course class================

// ------------add new course--------------
////--- return add course page view as response to browser---
app.get("/addnewcourse",(req,res)=>{
    res.render("addnewcourse.ejs",{msg:""});
   
});

app.post("/save",(req,res)=>{
   let {cname}=req.body;
   db.query("insert into cdata values('0',?)",[cname],(err,result)=>{
        
   });
  res.render("addnewcourse.ejs",{msg:"Course Added Successfully"})
 
});



//-------------view course---------------
//---show course---
app.get("/viewcourse",(req,res)=>{
    db.query("select * from cdata",(err,result)=>{
        if(err){
            res.render("viewcourse.ejs");
        }
        else{
            res.render("viewcourse.ejs",{data:result});
        }
    })
   
});


// ------------------delete course-----------------
app.get("/delById",(req,res)=>{
    let cid=parseInt(req.query.cid.trim());
    db.query("delete from cdata where cid=?",[cid],(err,result)=>{});
    db.query("select* from cdata",(err,result)=>{
        if(err){
            res.render("viewcourse.ejs")
        }
        else{
            res.render("viewcourse.ejs",{data:result});
        }

    })
});


// ---------------------update course------------------------
app.get("/update",(req,res)=>{
    let cid=parseInt(req.query.cid.trim());
    db.query("select *from cdata where cid=?",[cid],(err,result)=>{
        
      res.render("updatecourse.ejs",{crecord:result})
    });  
});

app.post("/finalupdate",(req,res)=>{
    let{cid,cname}=req.body;
    db.query("update cdata set cname=? where cid=?",[cname,cid],(err,result)=>{
        if(err){
            res.send("somthing went wronng");
        }
        else
        {
            res.redirect("/viewcourse");
        }
    })
});

// -------------------------course search---------------------------

app.get("/search",(req,res)=>{
    let cname=req.query.sd;
    db.query("select * from cdata where cname like  '%"+cname+"%'  ",(err,result)=>{
        res.json(result);
    });
})









//===========================Student class==============================
//------------add new student --------------
app.get("/addnewstudent",(req,res)=>{
   db.query("select * from cdata",(err,result)=>{
    if(err){
        res("something went wrong");
    }
    res.render("addnewstudent.ejs",{course:result});
   });
});

app.post("/addstud",(req,res)=>{
let{sname,email,contact,cid}=req.body;
db.query("insert into student values('0',?,?,?,?)",[sname,email,contact,cid],(err,result)=>{

    if(err){
        res.send("Somthing went wrong"+err);
    }
    else{
        db.query("select * from cdata",(err,result)=>{
        if(err){
            res.send("Erro");
        }
        res.render("addnewstudent.ejs",{course:result});
        });
    }

    });
    
});


//---------------view student--------------------
app.get("/viewstudent",(req,res)=>{
    
   db.query("Select sid,sname,email,contact,cname from student s inner join cdata c on s.cid=c.cid",(err,result)=>{
    if(err){
        res.send("Somthing went wrong");
    }
    else
    {
        res.render("viewstudent.ejs",{sdata:result});
    }
   })

});

// ----------------delete student----------------
app.get("/delstuid",(req,res)=>{
let sid=parseInt(req.query.sid.trim());
db.query("delete from student where sid=?",[sid],(err,result)=>{
    if(err){
        res.send("errr");
    }

    else
    {
        res.redirect("/viewstudent");
    }
});
});


// ---------------------search update------------------------

app.get("/supdate",(req,res)=>{
    let sid=parseInt(req.query.sid.trim());
    console.log(sid);
    db.query("select sid,sname,email,contact,cname from student s inner join cdata c on c.cid=s.cid where s.sid=?",[sid],(err,result)=>{

        if(err){
            res.send("Somthing went wrong"+ err);
        }
        else{
            res.render("updatestudent.ejs",{studdata:result});
        }
    });
    
});

app.post("/fupdate",(req,res)=>{
    let{sid,sname,email,contact}=req.body;
    db.query("update student set sname=?, email=?, contact=?  where sid=?",[sname,email,contact,sid],(err,result)=>{
        if(err){
            res.send("somthing went wrong" + err);
        }
        else{
            res.redirect("/viewstudent");
        }
    })
});


// ------------------student search-----------------

app.get("/ssearch",(req,res)=>{
    let sname=req.query.stud;
    db.query("Select sname,email,contact,cname from student s inner join cdata c on s.cid=c.cid where sname like '%"+sname+"%' ",(err,result)=>{
        res.json(result);
    });
})






//================Report================
// ----------course wise student list----------

app.get("/cslist", (req, res) => {
    const selectedCid = req.query.cid;

    db.query("SELECT * FROM cdata", (err, courseResult) => {
        if (err) return res.send("Error fetching courses");

        if (!selectedCid) {
            return res.render("cslist.ejs", {
                courselist: courseResult,
                studata: [],
                selectedCid: null // ✅ Send null if nothing selected
            });
        }

        db.query(
            "SELECT sname, email, contact, cname FROM student s INNER JOIN cdata c ON s.cid = c.cid WHERE s.cid = ?",
            [selectedCid],
            (err, studentResult) => {
                if (err) return res.send("Error fetching students");

                res.render("cslist.ejs", {
                    courselist: courseResult,
                    studata: studentResult,
                    selectedCid: selectedCid // ✅ Send selectedCid to the view
                });
            }
        );
    });
});



// ===========course wise student count============

app.get("/cscount",(req,res)=>{

    db.query("select c.cname,count(s.sid) as student_count from cdata c left join student s on c.cid=s.cid group by c.cid",(err,result)=>{
        if(err){
            return res.send("Somthing went wrog");
        }

        else{
            res.render("cscount.ejs",{cscount:result});
        }
    });

});



app.listen(3000,()=>{
    console.log("Server started on 3000 port");
})
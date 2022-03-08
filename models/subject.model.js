const sql=require("./db.js");

const Subject=function(subject){
    this.name=subject.name;
    
}

Subject.create=(newSubject,result)=>{
    sql.query(`SELECT * FROM subjects WHERE name ='${newSubject.name}'`,(err,res)=>{
        if(res.length){
            result(null,{"status":"2","message":"Already Exists"})
        }else{
            sql.query("INSERT INTO subjects SET ?",newSubject,(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                console.log("Created subject: ",{id:res.insertId,...newSubject});
                result(null,{"status":"1","message":"Registered Successfull!!",id:res.insertId,...newSubject});
            });
        }
    });
};
// User.login=(email,password,result)=>{
//     sql.query(`SELECT * FROM users WHERE email='${email}' AND password='${password}'`,(err,res)=>{
//         errors=[];
//         if(err){
//             console.log("error: ",err);
//             errors.push(err);
//             result(errors,null);
//             return;
//         }
//         if(res.length){
//             console.log("found user: ",res[0]);
//             var data={"status":"1","data":res[0]};
//             result(null,data);
//             return;

//         }
//         //err.message=
//         errors.push({kind:"not found","status":"2","msg":"Wrong Email & Password"});
//         console.log(errors);
//         result(null,errors);
//     })
// }


Subject.findById=(id,result)=>{
    sql.query(`SELECT * FROM subjects WHERE id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found subjects: ",res[0]);
            result(null,res[0]);
            return;

        }
        result({kind:"not found"},null);
    });
};


Subject.getAll=result=>{
    sql.query("SELECT * FROM subjects",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("subjects: ",res);
        result(null,res);

    });
};

Subject.updateById=(id,subject,result)=>{
    var subjectUpdate={};
    if(subject.name != null){
        subjectUpdate.name=subject.name;
    }
   
    sql.query(
        "UPDATE subjects SET ? WHERE id=?",[subjectUpdate,id],(err,res)=>{
            if(err){
                console.log("error: ",err);
                result(null,err);
                return;
            }
            if(res.affectedRows==0){
                result({kind:"not_found"},null);
                return;
            }
            console.log("updated subject: ",{id:id,...subjectUpdate});
            result(null,{id:id,...subjectUpdate});
        }
    )
}
Subject.remove=(id,result)=>{
    sql.query("DELETE FROM subjects WHERE id=?",id,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return; 
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted subject with id: ", id);
        result(null, res);
    })
}

Subject.removeAll = result => {
    sql.query("DELETE FROM subjects", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} subjects`);
      result(null, res);
    });
};

module.exports=Subject;
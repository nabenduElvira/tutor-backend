const sql=require("./db.js");

const Teach=function(teach){
    this.name=teach.name;
    
}

Teach.create=(newTeach,result)=>{
    sql.query(`SELECT * FROM teaches WHERE name ='${newTeach.name}'`,(err,res)=>{
        if(res.length){
            result(null,{"status":"2","message":"Already Exists"})
        }else{
            sql.query("INSERT INTO teaches SET ?",newTeach,(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                console.log("Created subject: ",{id:res.insertId,...newTeach});
                result(null,{"status":"1","message":"Registered Successfull!!",id:res.insertId,...newTeach});
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


Teach.findById=(id,result)=>{
    sql.query(`SELECT * FROM teaches WHERE id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found teaches: ",res[0]);
            result(null,res[0]);
            return;

        }
        result({kind:"not found"},null);
    });
};


Teach.getAll=result=>{
    sql.query("SELECT * FROM teaches",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("teaches: ",res);
        result(null,res);

    });
};

Teach.updateById=(id,teach,result)=>{
    var teachUpdate={};
    if(teach.name != null){
        teachUpdate.name=teach.name;
    }
   
    sql.query(
        "UPDATE teaches SET ? WHERE id=?",[teachUpdate,id],(err,res)=>{
            if(err){
                console.log("error: ",err);
                result(null,err);
                return;
            }
            if(res.affectedRows==0){
                result({kind:"not_found"},null);
                return;
            }
            console.log("updated subject: ",{id:id,...teachUpdate});
            result(null,{id:id,...teachUpdate});
        }
    )
}
Teach.remove=(id,result)=>{
    sql.query("DELETE FROM teaches WHERE id=?",id,(err,res)=>{
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

Teach.removeAll = result => {
    sql.query("DELETE FROM teaches", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} teaches`);
      result(null, res);
    });
};

module.exports=Teach;
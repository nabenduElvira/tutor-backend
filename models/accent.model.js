const sql=require("./db.js");

const Accent=function(accent){
    this.name=accent.name;
    
}

Accent.create=(newAccent,result)=>{
    sql.query(`SELECT * FROM accentes WHERE name ='${newAccent.name}'`,(err,res)=>{
        if(res.length){
            result(null,{"status":"2","message":"Already Exists"})
        }else{
            sql.query("INSERT INTO accentes SET ?",newAccent,(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                console.log("Created subject: ",{id:res.insertId,...newAccent});
                result(null,{"status":"1","message":"Registered Successfull!!",id:res.insertId,...newAccent});
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


Accent.findById=(id,result)=>{
    sql.query(`SELECT * FROM accentes WHERE id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found accentes: ",res[0]);
            result(null,res[0]);
            return;

        }
        result({kind:"not found"},null);
    });
};


Accent.getAll=result=>{
    sql.query("SELECT * FROM accentes",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("accentes: ",res);
        result(null,res);

    });
};

Accent.updateById=(id,accent,result)=>{
    var accentUpdate={};
    if(accent.name != null){
        accentUpdate.name=accent.name;
    }
   
    sql.query(
        "UPDATE accentes SET ? WHERE id=?",[accentUpdate,id],(err,res)=>{
            if(err){
                console.log("error: ",err);
                result(null,err);
                return;
            }
            if(res.affectedRows==0){
                result({kind:"not_found"},null);
                return;
            }
            console.log("updated subject: ",{id:id,...accentUpdate});
            result(null,{id:id,...accentUpdate});
        }
    )
}
Accent.remove=(id,result)=>{
    sql.query("DELETE FROM accentes WHERE id=?",id,(err,res)=>{
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

Accent.removeAll = result => {
    sql.query("DELETE FROM accentes", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} accentes`);
      result(null, res);
    });
};

module.exports=Accent;
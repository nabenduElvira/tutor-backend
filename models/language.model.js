const sql=require("./db.js");

const Language=function(language){
    this.name=language.name;
    
}

Language.create=(newLanguage,result)=>{
    sql.query(`SELECT * FROM languages WHERE name ='${newLanguage.name}'`,(err,res)=>{
        if(res.length){
            result(null,{"status":"2","message":"Already Exists"})
        }else{
            sql.query("INSERT INTO languages SET ?",newLanguage,(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                console.log("Created language: ",{id:res.insertId,...newLanguage});
                result(null,{"status":"1","message":"Registered Successfull!!",id:res.insertId,...newLanguage});
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


Language.findById=(id,result)=>{
    sql.query(`SELECT * FROM languages WHERE id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found languages: ",res[0]);
            result(null,res[0]);
            return;

        }
        result({kind:"not found"},null);
    });
};


Language.getAll=result=>{
    sql.query("SELECT * FROM languages",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("languages: ",res);
        result(null,res);

    });
};

Language.updateById=(id,language,result)=>{
    var languageUpdate={};
    if(language.name != null){
        languageUpdate.name=language.name;
    }
   
    sql.query(
        "UPDATE languages SET ? WHERE id=?",[languageUpdate,id],(err,res)=>{
            if(err){
                console.log("error: ",err);
                result(null,err);
                return;
            }
            if(res.affectedRows==0){
                result({kind:"not_found"},null);
                return;
            }
            console.log("updated subject: ",{id:id,...languageUpdate});
            result(null,{id:id,...languageUpdate});
        }
    )
}
Language.remove=(id,result)=>{
    sql.query("DELETE FROM languages WHERE id=?",id,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return; 
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted language with id: ", id);
        result(null, res);
    })
}

Language.removeAll = result => {
    sql.query("DELETE FROM languages", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} languages`);
      result(null, res);
    });
};

module.exports=Language;
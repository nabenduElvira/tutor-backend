const sql=require("./db.js");

const Experience=function(experience){
    this.title=experience.title;
    this.name=experience.name;
    this.teacher_id=experience.teacher_id;
    this.from_year=experience.from_year;
    this.to_year=experience.to_year;
    this.upload_doc=experience.upload_doc;
}

Experience.create=(newExperience,result)=>{
    
            sql.query("INSERT INTO experiences SET ?",newExperience,(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                console.log("Created Experience: ",{id:res.insertId,...newExperience});
                result(null,{"status":"1","message":"Registered Successfull!!",id:res.insertId,...newExperience});
            });
       
};

Experience.findByTeacherId=(id,result)=>{
    sql.query(`SELECT experiences.* FROM experiences WHERE experiences.teacher_id = ${id}`,(err,res)=>{
          errors=[];
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found experiences: ",res);
             var data={"status":"1","data":res};
            result(null,data);
            return;

        }
         //err.message=
        errors.push({kind:"not found","status":"2","msg":"experiences not found"});
        console.log(errors);
        // result(null,errors);
         var data={"status":"2","data":[]};
            result(null,data);
    });
};

Experience.remove=(id,result)=>{
    sql.query("DELETE FROM experiences WHERE id=?",id,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return; 
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted experience with id: ", id);
        result(null, res);
    })
}

module.exports=Experience;
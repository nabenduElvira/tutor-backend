const sql=require("./db.js");

const Certification=function(certification){
    this.title=certification.title;
    this.name=certification.name;
    this.teacher_id=certification.teacher_id;
    this.from_year=certification.from_year;
    this.to_year=certification.to_year;
    this.upload_doc=certification.upload_doc;
}

Certification.create=(newCertification,result)=>{
    
            sql.query("INSERT INTO certifications SET ?",newCertification,(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                console.log("Created Certification: ",{id:res.insertId,...newCertification});
                result(null,{"status":"1","message":"Registered Successfull!!",id:res.insertId,...newCertification});
            });
       
};

Certification.findByTeacherId=(id,result)=>{
    sql.query(`SELECT certifications.* FROM certifications WHERE certifications.teacher_id = ${id}`,(err,res)=>{
          errors=[];
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found certifications: ",res);
             var data={"status":"1","data":res};
            result(null,data);
            return;

        }
         //err.message=
        errors.push({kind:"not found","status":"2","msg":"certifications not found"});
        console.log(errors);
        // result(null,errors);
         var data={"status":"2","data":[]};
            result(null,data);
    });
};

Certification.remove=(id,result)=>{
    sql.query("DELETE FROM certifications WHERE id=?",id,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return; 
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted certification with id: ", id);
        result(null, res);
    })
}

module.exports=Certification;
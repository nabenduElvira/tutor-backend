const sql=require("./db.js");

const Education=function(education){
    this.title=education.title;
    this.name=education.name;
    this.teacher_id=education.teacher_id;
    this.from_year=education.from_year;
    this.to_year=education.to_year;
    this.upload_doc=education.upload_doc;
}

Education.create=(newEducation,result)=>{
    
            sql.query("INSERT INTO educations SET ?",newEducation,(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                console.log("Created Education: ",{id:res.insertId,...newEducation});
                result(null,{"status":"1","message":"Registered Successfull!!",id:res.insertId,...newEducation});
            });
       
};


Education.findById=(id,result)=>{
    sql.query(`SELECT lessons.* FROM educations WHERE lessons.id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found lessons: ",res[0]);
            result(null,res[0]);
            return;

        }
        result({kind:"not found"},null);
    });
};

// Lesson.findByTeacherId=(id,result)=>{
//     sql.query(`SELECT lessons.* FROM lessons WHERE lessons.teacher_id = ${id}`,(err,res)=>{
//         if(err){
//             console.log("error: ",err);
//             result(err,null);
//             return;
//         }
//         if(res.length){
//             console.log("found lessons: ",res);
//             result(null,res);
//             return;

//         }
//         result({kind:"not found"},null);
//     });
// };

Education.findByTeacherId=(id,result)=>{
    sql.query(`SELECT educations.* FROM educations WHERE educations.teacher_id = ${id}`,(err,res)=>{
          errors=[];
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found educations: ",res);
             var data={"status":"1","data":res};
            result(null,data);
            return;

        }
         //err.message=
        errors.push({kind:"not found","status":"2","msg":"Lesson not found"});
        console.log(errors);
        // result(null,errors);
         var data={"status":"2","data":[]};
            result(null,data);
    });
};

Education.getAll=result=>{
    sql.query("SELECT lessons.* FROM educations",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("lessons: ",res);
        result(null,res);

    });
};

Education.updateById=(id,education,result)=>{
    var lessonUpdate={};
    if(lesson.title != null){
        lessonUpdate.title=lesson.title;
    }
    if(lesson.time != null){
        lessonUpdate.time=lesson.time;
    }
    if(lesson.quantity != null){
        lessonUpdate.quantity=lesson.quantity;
    }
    if(lesson.price != null){
        lessonUpdate.price=lesson.price;
    }
    
    sql.query(
        "UPDATE educations SET ? WHERE id=?",[lessonUpdate,id],(err,res)=>{
            if(err){
                console.log("error: ",err);
                result(null,err);
                return;
            }
            if(res.affectedRows==0){
                result({kind:"not_found"},null);
                return;
            }
            console.log("updated teacher: ",{id:id,...lessonUpdate});
            result(null,{id:id,...lessonUpdate});
        }
    )
}
Education.remove=(id,result)=>{
    sql.query("DELETE FROM educations WHERE id=?",id,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return; 
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted education with id: ", id);
        result(null, res);
    })
}

Education.removeAll = result => {
    sql.query("DELETE FROM educations", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} lessons`);
      result(null, res);
    });
};

module.exports=Education;
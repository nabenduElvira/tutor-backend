const sql=require("./db.js");

const Lesson=function(lesson){
    this.title=lesson.title;
    this.time=lesson.time;
    this.teacher_id=lesson.teacher_id;
    this.subject=lesson.subject;
    this.quantity=lesson.quantity;
    this.price=lesson.price;
}

Lesson.create=(newLesson,result)=>{
    
        sql.query("INSERT INTO lessons SET ?",newLesson,(err,res)=>{

            if(err){
                console.log("error: ",err);
                result(err,null);
                return;
            }
            console.log("Created lesson: ",{id:res.insertId,...newLesson});
            result(null,{"status":"1","message":"Registered Successfull!!",id:res.insertId,...newLesson});
        });
       
};


Lesson.findById=(id,result)=>{
    sql.query(`SELECT lessons.* FROM lessons WHERE lessons.id = ${id}`,(err,res)=>{
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

Lesson.findByTeacherId=(id,result)=>{
    sql.query(`SELECT lessons.* FROM lessons WHERE lessons.teacher_id = ${id}`,(err,res)=>{
          errors=[];
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found lessons: ",res);
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

Lesson.getAll=result=>{
    sql.query("SELECT lessons.* FROM lessons",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("lessons: ",res);
        result(null,res);

    });
};

Lesson.updateById=(id,lesson,result)=>{
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
        "UPDATE lessons SET ? WHERE id=?",[lessonUpdate,id],(err,res)=>{
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
Lesson.remove=(id,result)=>{
    sql.query("DELETE FROM lessons WHERE id=?",id,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return; 
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted lesson with id: ", id);
        result(null, res);
    })
}

Lesson.removeAll = result => {
    sql.query("DELETE FROM lessons", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} lessons`);
      result(null, res);
    });
};

module.exports=Lesson;
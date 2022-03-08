const sql=require("./db.js");

const Teacher=function(teacher){
    this.user_id=teacher.user_id;
    this.teaches=teacher.teaches;
    this.teaches_from=teacher.teaches_from;
    this.topics=teacher.topics;
    this.about=teacher.about;
    this.location=teacher.location;
    this.response_time=teacher.response_time;
    this.ratting=teacher.ratting;
    this.accents=teacher.accents;
    this.lession_include=teacher.lession_include;
    this.subject=teacher.subject;
    this.education=teacher.education;
    this.work_exp=teacher.work_exp;
    this.certificate=teacher.certificate;
    this.youtube_id=teacher.youtube_id;
    this.upload_video=teacher.upload_video;
}

Teacher.create=(newTeacher,result)=>{
    sql.query(`SELECT * FROM teachers WHERE user_id ='${newTeacher.user_id}'`,(err,res)=>{
        if(res.length){
            result(null,{"status":"2","message":"Already Exists"})
        }else{
            sql.query("INSERT INTO teachers SET ?",newTeacher,(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                console.log("Created teacher: ",{id:res.insertId,...newTeacher});
                result(null,{"status":"1","message":"Registered Successfull!!",id:res.insertId,...newTeacher});
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


Teacher.findById=(id,result)=>{
    sql.query(`SELECT teachers.*,users.first_name,users.image,users.last_name,users.email,users.phone,users.gender,users.country,users.state,users.city,users.address,users.zip_code,users.time_zone,users.paypal_email,users.clock,users.language FROM teachers INNER JOIN users ON teachers.user_id=users.id WHERE teachers.id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found teachers: ",res[0]);
            result(null,res[0]);
            return;

        }
        result({kind:"not found"},null);
    });
};

Teacher.findByUserId=(id,result)=>{
    sql.query(`SELECT teachers.*,users.first_name,users.image,users.last_name,users.email,users.phone,users.gender,users.country,users.state,users.city,users.address,users.zip_code,users.time_zone,users.paypal_email,users.clock,users.language FROM teachers INNER JOIN users ON teachers.user_id=users.id WHERE teachers.user_id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found teachers: ",res[0]);
            result(null,res[0]);
            return;

        }
        result({kind:"not found"},null);
    });
};

Teacher.getAll=result=>{
    sql.query("SELECT teachers.*,users.first_name,users.image,users.last_name,users.email,users.phone,users.gender,users.country,users.state,users.city,users.address,users.zip_code,users.time_zone,users.paypal_email,users.clock,users.language,(SELECT favourite_teacher.user_id FROM favourite_teacher WHERE favourite_teacher.teacher_id=teachers.id) AS favourite_teacher FROM teachers INNER JOIN users ON teachers.user_id=users.id",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("teachers: ",res);
        result(null,res);

    });
};

Teacher.updateById=(id,teacher,result)=>{
    var teacherUpdate={};
    if(teacher.teaches != null){
        teacherUpdate.teaches=teacher.teaches;
    }
    if(teacher.teaches_from != null){
        teacherUpdate.teaches_from=teacher.teaches_from;
    }
    if(teacher.topics != null){
        teacherUpdate.topics=teacher.topics;
    }
    if(teacher.about != null){
        teacherUpdate.about=teacher.about;
    }
    if(teacher.response_time != null){
        teacherUpdate.response_time=teacher.response_time;
    }
    if(teacher.ratting != null){
        teacherUpdate.ratting=teacher.ratting;
    }
    if(teacher.accents != null){
        teacherUpdate.accents=teacher.accents;
    }

    if(teacher.lession_include != null){
        teacherUpdate.lession_include=teacher.lession_include;
    }
    if(teacher.subject != null){
        teacherUpdate.subject=teacher.subject;
    }
    if(teacher.education != null){
        teacherUpdate.education=teacher.education;
    }
    if(teacher.work_exp != null){
        teacherUpdate.work_exp=teacher.work_exp;
    }
    if(teacher.certificate != null){
        teacherUpdate.certificate=teacher.certificate;
    }
    if(teacher.location != null){
        teacherUpdate.location=teacher.location;
    }
    if(teacher.youtube_id != null){
        teacherUpdate.youtube_id=teacher.youtube_id;
    }
    if(teacher.upload_video != null){
        teacherUpdate.upload_video=teacher.upload_video;
    }
    sql.query(
        "UPDATE teachers SET ? WHERE id=?",[teacherUpdate,id],(err,res)=>{
            if(err){
                console.log("error: ",err);
                result(null,err);
                return;
            }
            if(res.affectedRows==0){
                result({kind:"not_found"},null);
                return;
            }
            console.log("updated teacher: ",{id:id,...teacherUpdate});
            result(null,{id:id,...teacherUpdate});
        }
    )
}
Teacher.remove=(id,result)=>{
    sql.query("DELETE users.*, teachers.* from users, teachers WHERE users.id=teachers.user_id AND teachers.id=?",id,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return; 
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted teacher with id: ", id);
        result(null, res);
    })
}

Teacher.removeAll = result => {
    sql.query("DELETE FROM teachers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} teachers`);
      result(null, res);
    });
};

Teacher.getTeacherSubject=(id,result)=>{
    sql.query(`SELECT teachers.id AS teacher_id, teachers.subject FROM teachers WHERE teachers.user_id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found teachers: ",res[0]);
            result(null,res[0]);
            return;

        }
        result({kind:"not found"},null);
    });
};

module.exports=Teacher;
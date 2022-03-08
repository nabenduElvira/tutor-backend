const sql=require("./db.js");

const Schedule=function(schedule){
    this.teacher_id=schedule.teacher_id;
    this.title=schedule.title;
    this.start=schedule.start;
    this.end=schedule.end;
    
}

Schedule.create=(newSchedule,result)=>{
    // sql.query(`SELECT * FROM schedules WHERE title ='${newSchedule.title}'`,(err,res)=>{
    //     if(res.length){
    //         result(null,{"status":"2","message":"Already Exists"})
    //     }else{
            sql.query("INSERT INTO schedules SET ?",newSchedule,(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                console.log("Created subject: ",{id:res.insertId,...newSchedule});
                result(null,{"status":"1","message":"Registered Successfull!!",id:res.insertId,...newSchedule});
            });
        // }
    // });
};



Schedule.findByTeacherId = (id, result) => {
  sql.query(
    `SELECT schedules.* FROM schedules WHERE schedules.start>CURRENT_DATE AND schedules.teacher_id = ${id} `,
    (err, res) => {
      errors = [];
      if (err) {
        console.log("error: ", err);
        errors.push(err);
        result(errors, null);
        return;
      }
      if (res.length) {
        console.log("found Favourite teacher: ", res);
        var data = { status: "1", data: res };
        result(null, data);
        return;
      }
      //   result({ kind: "not found" }, null);
      //err.message=
    //   errors.push({
    //     kind: "not found",
    //     status: "2",
    //     msg: `Data not found with Teacher Id ${id} `,
    //   });
    //   console.log(errors);
    //   result(null, errors);
      
       errors.push({kind:"not found","status":"2","msg":"Lesson not found"});
        console.log(errors);
        // result(null,errors);
         var data={"status":"2","data":[]};
            result(null,data);
    }
  );
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


// Accent.findById=(id,result)=>{
//     sql.query(`SELECT * FROM accentes WHERE id = ${id}`,(err,res)=>{
//         if(err){
//             console.log("error: ",err);
//             result(err,null);
//             return;
//         }
//         if(res.length){
//             console.log("found accentes: ",res[0]);
//             result(null,res[0]);
//             return;

//         }
//         result({kind:"not found"},null);
//     });
// };




Schedule.getAll=result=>{
    sql.query("SELECT * FROM schedules",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("schedules: ",res);
        result(null,res);

    });
};
Schedule.getAllAutomatic=result=>{
    sql.query("SELECT (SELECT students.user_id FROM students WHERE students.id=schedules_booking.student_id) AS student_id,schedules_booking.linkid,schedules_booking.status,(SELECT teachers.user_id FROM teachers WHERE schedules.teacher_id=teachers.id ) AS teacher_id,schedules.title,schedules.start,schedules.end FROM schedules_booking INNER JOIN schedules ON schedules.id=schedules_booking.schedule_id",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
         console.log("schedules: ",res);
        result(null,res);
    })
}
// Accent.updateById=(id,accent,result)=>{
//     var accentUpdate={};
//     if(accent.name != null){
//         accentUpdate.name=accent.name;
//     }
   
//     sql.query(
//         "UPDATE accentes SET ? WHERE id=?",[accentUpdate,id],(err,res)=>{
//             if(err){
//                 console.log("error: ",err);
//                 result(null,err);
//                 return;
//             }
//             if(res.affectedRows==0){
//                 result({kind:"not_found"},null);
//                 return;
//             }
//             console.log("updated subject: ",{id:id,...accentUpdate});
//             result(null,{id:id,...accentUpdate});
//         }
//     )
// }
// Accent.remove=(id,result)=>{
//     sql.query("DELETE FROM accentes WHERE id=?",id,(err,res)=>{
//         if(err){
//             console.log("error: ", err);
//             result(null, err);
//             return; 
//         }
//         if (res.affectedRows == 0) {
//             result({ kind: "not_found" }, null);
//             return;
//         }
//         console.log("deleted subject with id: ", id);
//         result(null, res);
//     })
// }

// Accent.removeAll = result => {
//     sql.query("DELETE FROM accentes", (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
  
//       console.log(`deleted ${res.affectedRows} accentes`);
//       result(null, res);
//     });
// };

module.exports=Schedule;
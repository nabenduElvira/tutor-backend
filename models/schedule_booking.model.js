const sql=require("./db.js");

const ScheduleBooking=function(schedule_booking){
    this.schedule_id=schedule_booking.schedule_id;
    this.student_id=schedule_booking.student_id;
    this.linkid=schedule_booking.linkid;
    
}

ScheduleBooking.create=(newschedule_booking,result)=>{
    sql.query(`SELECT * FROM schedules_booking WHERE schedule_id ='${newschedule_booking.schedule_id}'`,(err,res)=>{
         if(res.length){
             result(null,{"status":"2","message":"Sceduled Already Booked"})
         }else{
            sql.query("INSERT INTO schedules_booking SET ?",newschedule_booking,(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                console.log("Created subject: ",{id:res.insertId,...newschedule_booking});
                result(null,{"status":"1","message":"Registered Successfull!!",id:res.insertId,...newschedule_booking});
            });
         }
     });
};



ScheduleBooking.findByStudentId = (id,page, result) => {
    // limit as 20
  const limit = 3;
  // page number
  
  // calculate offset
  
  const offset = (page - 1) * limit;
  // query for fetching data with page number and offset
    
  /*sql.query(
    `SELECT schedules_booking.*,schedules.title,schedules.start,schedules.end,schedules.id AS schedule_id,users.first_name,users.last_name,users.email,users.phone,users.gender,users.country,users.state,users.city,users.image,users.address,users.zip_code,users.status FROM schedules_booking INNER JOIN schedules ON schedules.id=schedules_booking.schedule_id INNER JOIN teachers ON teachers.id=schedules.teacher_id INNER JOIN users ON users.id=teachers.user_id WHERE schedules_booking.student_id= ${id} limit ${limit} OFFSET ${offset}`,*/
     sql.query(
    `SELECT schedules_booking.*,schedules.title,schedules.start,schedules.end,schedules.id AS schedule_id,users.first_name,users.last_name,users.email,users.phone,users.gender,users.country,users.state,users.city,users.image,users.address,users.zip_code,users.status FROM schedules_booking INNER JOIN schedules ON schedules.id=schedules_booking.schedule_id INNER JOIN teachers ON teachers.id=schedules.teacher_id INNER JOIN users ON users.id=teachers.user_id WHERE schedules_booking.student_id= ${id}`,
    (err, res) => {
      errors = [];
      if (err) {
        console.log("error: ", err);
        errors.push(err);
        result(errors, null);
        return;
      }
      if (res.length) {
        console.log("found Favourite student: ", res);
        
        var data = { status: "1",'page_count':res.length,'page_number':page, data: res };
        
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
      
       errors.push({kind:"not found","status":"2","msg":"Booking not found"});
        console.log(errors);
        // result(null,errors);
         var data={"status":"2","data":[]};
            result(null,data);
    }
  );
};
ScheduleBooking.findByteacherId=(id,page,result)=>{
     // limit as 20
  const limit = 3;
  // page number
  
  // calculate offset
  const offset = (page - 1) * limit;

    sql.query(`SELECT schedules.id AS schedule_id,schedules.title,schedules.start,schedules.end,schedules_booking.status,schedules_booking.linkid,users.first_name,users.last_name,users.email,users.phone,users.gender,users.country,users.state,users.city,users.address,users.address,users.zip_code,users.image FROM schedules INNER JOIN schedules_booking ON schedules.id=schedules_booking.schedule_id INNER JOIN students ON students.user_id=schedules_booking.student_id INNER JOIN users ON users.id=students.user_id WHERE schedules.teacher_id=${id} `,(err,res)=>{
        errors = [];
      if (err) {
        console.log("error: ", err);
        errors.push(err);
        result(errors, null);
        return;
      }
      if (res.length) {
        console.log("found Favourite student: ", res);
        var data = { status: "1",'page_count':res.length,'page_number':page, data: res };
        
        result(null, data);
        return;
      }
      errors.push({kind:"not found","status":"2","msg":"Booking not found"});
        console.log(errors);
        // result(null,errors);
         var data={"status":"2","data":[]};
            result(null,data);
    });
}
ScheduleBooking.findByLinkId=(id,page,result)=>{
     // limit as 20
  const limit = 3;
  // page number
  
  // calculate offset
  const offset = (page - 1) * limit;
  // query for fetching data with page number and offset
    
    /*sql.query(`SELECT schedules.id AS schedule_id,schedules.title,schedules.start,schedules.end,schedules_booking.status,users.first_name,users.last_name,users.email,users.phone,users.gender,users.country,users.state,users.city,users.address,users.address,users.zip_code,users.image FROM schedules INNER JOIN schedules_booking ON schedules.id=schedules_booking.schedule_id INNER JOIN students ON students.user_id=schedules_booking.student_id INNER JOIN users ON users.id=students.user_id WHERE schedules.teacher_id=${id} limit ${limit} OFFSET ${offset}`,(err,res)=>{*/
    sql.query(`SELECT schedules_booking.schedule_id,schedules_booking.student_id,schedules_booking.linkid,(SELECT teachers.user_id FROM teachers WHERE schedules.teacher_id=teachers.id) AS teacher_id FROM schedules_booking INNER JOIN schedules ON schedules.id=schedules_booking.schedule_id WHERE schedules_booking.linkid='${id}'`,(err,res)=>{
        errors = [];
      if (err) {
        console.log("error: ", err);
        errors.push(err);
        result(errors, null);
        return;
      }
      if (res.length) {
        console.log("found Favourite student: ", res);
        var data = { status: "1",'page_count':res.length,'page_number':page, data: res };
        
        result(null, data);
        return;
      }
      errors.push({kind:"not found","status":"2","msg":"Booking not found"});
        console.log(errors);
        // result(null,errors);
         var data={"status":"2","data":[]};
            result(null,data);
    });
}
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




ScheduleBooking.getAll=result=>{
    sql.query("SELECT * FROM schedules_booking",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("schedules_booking: ",res);
        result(null,res);

    });
};

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

module.exports=ScheduleBooking;
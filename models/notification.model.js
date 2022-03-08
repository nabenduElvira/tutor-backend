const sql=require("./db.js");

const Notification=function(notification){
    this.user_id=notification.user_id;
    this.msg=notification.msg;
}

Notification.create=(newNotification,result)=>{
    // sql.query(`SELECT * FROM schedules WHERE title ='${newSchedule.title}'`,(err,res)=>{
    //     if(res.length){
    //         result(null,{"status":"2","message":"Already Exists"})
    //     }else{
            sql.query("INSERT INTO notifications SET ?",newNotification,(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                console.log("Created Notification: ",{id:res.insertId,...newNotification});
                result(null,{"status":"1","message":"Registered Successfull!!",id:res.insertId,...newNotification});
            });
        // }
    // });
};



Notification.findByUserId = (id, result) => {
  sql.query(
    `SELECT notifications.* FROM notifications WHERE notifications.user_id = ${id} ORDER BY id DESC`,
    (err, res) => {
      errors = [];
      if (err) {
        console.log("error: ", err);
        errors.push(err);
        result(errors, null);
        return;
      }
      if (res.length) {
        console.log("found Notifications: ", res);
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
      
       errors.push({kind:"not found","status":"2","msg":"Notification not found"});
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


Notification.findById=(id,result)=>{
    sql.query(`SELECT * FROM notifications WHERE id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found notifications: ",res[0]);
            result(null,res[0]);
            return;

        }
        result({kind:"not found"},null);
    });
};




Notification.getAll=result=>{
    sql.query("SELECT * FROM notifications",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("notifications: ",res);
        result(null,res);

    });
};

Notification.updateById=(id,notification,result)=>{
    var notificationUpdate={};
    if(notification.status != null){
        notificationUpdate.status=notification.status;
    }
   
    sql.query(
        "UPDATE notifications SET ? WHERE id=?",[notificationUpdate,id],(err,res)=>{
            if(err){
                console.log("error: ",err);
                result(null,err);
                return;
            }
            if(res.affectedRows==0){
                result({kind:"not_found"},null);
                return;
            }
            console.log("updated notification: ",{id:id,...notificationUpdate});
            result(null,{id:id,...notificationUpdate});
        }
    )
}
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

module.exports=Notification;
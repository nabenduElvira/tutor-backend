const sql=require("./db.js");

const User=function(user){
    this.first_name=user.first_name;
    this.last_name=user.last_name;
    this.type=user.type;
    this.email=user.email;
    this.phone=user.phone;
    this.password=user.password;
    this.googleid=user.googleid;
    this.facebookid=user.facebookid;
    this.country=user.country;
    this.state=user.state;
    this.city=user.city;
    this.address=user.address;
    this.zip_code=user.zip_code;
    this.paypal_email=user.paypal_email;
    this.currency=user.currency;
    this.time_zone=user.time_zone;
    this.image=user.image;
    this.language=user.language;
    this.clock=user.clock;
    this.gender=user.gender;
    this.image=user.image;

}

User.create=(newUser,result)=>{
    sql.query(`SELECT * FROM users WHERE email='${newUser.email}'`,(err,res)=>{
        if(res.length){
            result(null,{"status":"2","message":"Already Exists"})
        }else{
            sql.query("INSERT INTO users SET ?",newUser,(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                console.log("Created user: ",{id:res.insertId,...newUser});
                result(null,{"status":"1","message":"Registered Successfull!!",id:res.insertId,...newUser});
            });
        }
    });
};
User.login=(email,password,result)=>{
    sql.query(`SELECT * FROM users WHERE email='${email}' AND password='${password}'`,(err,res)=>{
        errors=[];
        if(err){
            console.log("error: ",err);
            errors.push(err);
            result(errors,null);
            return;
        }
        if(res.length){
            console.log("found user: ",res[0]);
            var data={"status":"1","data":res[0]};
            result(null,data);
            return;

        }
        //err.message=
        errors.push({kind:"not found","status":"2","msg":"Wrong Email & Password"});
        console.log(errors);
        result(null,errors);
    })
}
User.fblogin=(facebookid,result)=>{
    sql.query(`SELECT * FROM users WHERE facebookid='${facebookid}'`,(err,res)=>{
        errors=[];
        if(err){
            console.log("error: ",err);
            errors.push(err);
            result(errors,null);
            return;
        }
        if(res.length){
            console.log("found user: ",res[0]);
            var data={"status":"1","data":res[0]};
            result(null,data);
            return;

        }
        //err.message=
        errors.push({kind:"not found","status":"2","msg":"Wrong Facebook Credential"});
        console.log(errors);
        result(null,errors);
    })
}
User.googlelogin=(googleid,result)=>{
    sql.query(`SELECT * FROM users WHERE googleid='${googleid}'`,(err,res)=>{
        errors=[];
        if(err){
            console.log("error: ",err);
            errors.push(err);
            result(errors,null);
            return;
        }
        if(res.length){
            console.log("found user: ",res[0]);
            var data={"status":"1","data":res[0]};
            result(null,data);
            return;

        }
        //err.message=
        errors.push({kind:"not found","status":"2","msg":"Wrong Google Credential"});
        console.log(errors);
        result(null,errors);
    })
}

User.findById=(user_id,result)=>{
    sql.query(`SELECT * FROM users WHERE id= ${user_id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found user: ",res[0]);
            result(null,res[0]);
            return;

        }
        result({kind:"not found"},null);
    });
};

User.getAll=result=>{
    sql.query("SELECT * FROM users",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("users: ",res);
        result(null,res);

    });
};

User.updateById=(id,user,result)=>{
    console.log("id"+id);
    console.log("user");
    // console.log(user);
    var userUpdate={};
    if(user.first_name != null){
        userUpdate.first_name=user.first_name;
    }
    if(user.last_name != null){
        userUpdate.last_name=user.last_name;
    }
    if(user.phone != null){
        userUpdate.phone=user.phone;
    }
    if(user.gender != null){
        userUpdate.gender=user.gender;
    }
    if(user.country != null){
        userUpdate.country=user.country;
    }
    if(user.state != null){
        userUpdate.state=user.state;
    }
    if(user.city != null){
        userUpdate.city=user.city;
    }
    if(user.address != null){
        userUpdate.address=user.address;
    }
    if(user.zip_code != null){
        userUpdate.zip_code=user.zip_code;
    }
    if(user.paypal_email != null){
        userUpdate.paypal_email=user.paypal_email;
    }
    if(user.currency != null){
        userUpdate.currency=user.currency;
    }
    if(user.time_zone != null){
        userUpdate.time_zone=user.time_zone;
    }
    if(user.language != null){
        userUpdate.language=user.language;
    }
    if(user.clock != null){
        userUpdate.clock=user.clock;
    }
    if(user.image != null){
        userUpdate.image=user.image;
    }
    
//   var sql="UPDATE users SET "+userUpdate+" WHERE id="+id;
//   console.log("sql");
//   console.log(sql);
console.log("User Update");
    console.log(userUpdate);
    if(Object.keys(userUpdate).length != 0){
    var sqlqr=`"UPDATE users SET ? WHERE id=?",[userUpdate,id]`;
    console.log(sqlqr);
    sql.query(
        "UPDATE users SET ? WHERE id=?",[userUpdate,id],(err,res)=>{
            if(err){
                console.log("error: ",err);
                result(null,err);
                return;
            }
            if(res.affectedRows==0){
                result({kind:"not_found"},null);
                return;
            }
            console.log("updated customer: ",{id:id,...user});
            result(null,{"status":"1","message":"Updated User Successfull!!"});
        }
    );
    }else{
         result(null,{"status":"1","message":"Updated User Successfull!!"});
    }
};

User.changepassword=(id,password,result)=>{
     sql.query(
        "UPDATE users SET password=? WHERE id=?",[password,id],(err,res)=>{
            if(err){
                console.log("error: ",err);
                result(null,err);
                return;
            }
            if(res.affectedRows==0){
                result({kind:"not_found"},null);
                return;
            }
            console.log("updated customer: ",{id:id});
            result(null,{"status":"1","message":"Changed User Password Successfull!!",id:id});
        }
    );
};

User.remove=(id,result)=>{
    sql.query("DELETE FROM users WHERE id=?",id,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return; 
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted user with id: ", id);
        result(null, res);
    })
}

User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
};

User.forgotpassword=(user,result)=>{
    sql.query(`SELECT * FROM users WHERE email='${user.email}'`,(err,res)=>{
        if(res.length){
            sql.query("UPDATE users SET ? WHERE id= ?",[user,res[0].id],(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                //console.log("Created user: ",{id:res.insertId,...newUser});
                result(null,{"status":"1","message":"Password Changed Successfull!!"});
            });
           
        }else{
             result(null,{"status":"2","message":"Not Exists"})
        }
    });
};

module.exports=User;
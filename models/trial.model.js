const sql=require("./db.js");

const Trial=function(trial){
    this.student_id=trial.student_id,
    this.teacher_id=trial.teacher_id;
    this.start_times=trial.start_times;
    this.end_times=trial.end_times;
    this.lessons=trial.lessons;
    this.users=trial.users;
    this.links=trial.links;
    this.class_type=trial.class_type;
}

Trial.create=(newTrial,result)=>{
            
    sql.query("INSERT INTO trials SET ?",newTrial,(err,res)=>{

        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        console.log("Created trial: ",{id:res.insertId,...newTrial});
        result(null,{"status":"1","message":"Trial added Successfull!!",id:res.insertId,...newTrial});
    });
       
};


Trial.findByStudentId=(id,result)=>{
    sql.query(`SELECT a.*,b.*, a.id AS trials_id FROM trials a INNER JOIN users b ON a.student_id = b.id WHERE b.id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found trials: ",res);
            result(null,res);
            return;

        }
        result({kind:"not found"},null);
    });
};





Trial.findById=(id,result)=>{
    sql.query(`SELECT trials.* FROM trials WHERE trials.id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found trials: ",res[0]);
            result(null,res[0]);
            return;

        }
        result({kind:"not found"},null);
    });
};

Trial.findByTeacherId=(id,result)=>{
    sql.query(`SELECT trials.* FROM trials WHERE trials.teacher_id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found trials: ",res);
            result(null,res);
            return;

        }
        result({kind:"not found"},null);
    });
};

Trial.getAll=result=>{
    sql.query("SELECT trials.* FROM trials",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("trials: ",res);
        result(null,res);

    });
};

Trial.updateById=(id,trial,result)=>{
    var trialUpdate={};
    if(trial.times != null){
        trialUpdate.times=trial.times;
    }
    if(trial.users != null){
        trialUpdate.users=trial.users;
    }
    
    trialUpdate.links="/video?id="+id;
    sql.query(
        "UPDATE trials SET ? WHERE id=?",[trialUpdate,id],(err,res)=>{
            if(err){
                console.log("error: ",err);
                result(null,err);
                return;
            }
            if(res.affectedRows==0){
                result({kind:"not_found"},null);
                return;
            }
            console.log("updated teacher: ",{id:id,...trialUpdate});
            result(null,{id:id,...trialUpdate});
        }
    )
}
Trial.remove=(id,result)=>{
    sql.query("DELETE FROM trials WHERE id=?",id,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return; 
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted trial with id: ", id);
        result(null, res);
    })
}

Trial.removeAll = result => {
    sql.query("DELETE FROM trials", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} trials`);
      result(null, res);
    });
};

module.exports=Trial;
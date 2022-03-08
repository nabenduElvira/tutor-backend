const sql=require("./db.js");

const JobRequest=function(jobrequest){
    this.request_id=jobrequest.request_id;
    this.teacher_id=jobrequest.teacher_id;
    this.request=jobrequest.request;
   
}

JobRequest.create=(newJobRequest,result)=>{
    
    sql.query("INSERT INTO job_requests SET ?",newJobRequest,(err,res)=>{

        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        console.log("Created lesson: ",{id:res.insertId,...newJobRequest});
        result(null,{"status":"1","message":"Job is submitted!!",id:res.insertId,...newJobRequest});
    });
   
};

JobRequest.getAll=result=>{
    sql.query("SELECT request_teachers.*,job_requests.* FROM request_teachers INNER JOIN job_requests ON request_teachers.id = job_requests.id",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("job_request: ",res);
        result(null,res);

    });
};



module.exports=JobRequest;
const sql=require("./db.js");

const RequestTeacher=function(teacher){
    this.subject = teacher.subject;
    this.description = teacher.description;
    this.student_id = teacher.student_id;
}


RequestTeacher.create=(newRequestTeacher,result)=>{
    sql.query("INSERT INTO request_teachers SET ?",newRequestTeacher,(err,res)=>{

        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        console.log("Created Request: ",{id:res.insertId,...newRequestTeacher});
        result(null,{"status":"1","message":"Request submitted successfully!!",id:res.insertId,...newRequestTeacher});
    });
}


// RequestTeacher.getAll=result=>{
//     sql.query("SELECT * FROM request_teachers",(err,res)=>{
//         if(err){
//             console.log("error: ",err);
//             result(null,err);
//             return;
//         }
//         console.log("lessons: ",res);
//         result(null,res);

//     });
// };


RequestTeacher.findById=(id,result)=>{
    sql.query(`SELECT a.*,b.*,c.* FROM request_teachers a INNER JOIN job_requests b ON a.id = b.request_id INNER JOIN users c ON a.student_id=c.id WHERE c.id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found students: ",res);
            result(null,res);
            return;

        }
        result({kind:"not found"},null);
    });
};


RequestTeacher.getAll=result=>{
    sql.query("SELECT request_teachers.*,users.*,request_teachers.id as rid FROM request_teachers INNER JOIN users ON request_teachers.student_id=users.id",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("lessons: ",res);
        result(null,res);

    });
};

RequestTeacher.findId=(id,result)=>{
    sql.query(`SELECT a.*,b.*, a.id AS request_id FROM request_teachers a INNER JOIN users b ON a.student_id = b.id WHERE a.student_id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found students: ",res);
            result(null,res);
            return;

        }
        result({kind:"not found"},null);
    });
};



module.exports=RequestTeacher;
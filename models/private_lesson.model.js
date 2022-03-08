const sql=require("./db.js");

const Privatelesson=function(privatelesson){
    this.teacher_id=privatelesson.teacher_id;
    this.subject=privatelesson.subject;
    this.lessons=privatelesson.lessons;
    this.amount = privatelesson.amount;
}

Privatelesson.create=(newPrivatelesson,result)=>{
    
    sql.query("INSERT INTO private_lessons SET ?",newPrivatelesson,(err,res)=>{

        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        console.log("Created lesson: ",{id:res.insertId,...newPrivatelesson});
        result(null,{"status":"1","message":"Private lessons Created Successfully!!",id:res.insertId,...newPrivatelesson});
    });
   
};

Privatelesson.findId=(id,result)=>{
    sql.query(`SELECT a.*,b.*, a.id AS teacher_id FROM teachers a INNER JOIN private_lessons b ON a.id = b.teacher_id WHERE a.id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found teacher private lessons: ",res);
            result(null,res);
            return;

        }
        result({kind:"not found"},null);
    });
};


module.exports=Privatelesson;
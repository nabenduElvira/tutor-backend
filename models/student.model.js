const sql=require("./db.js");

const Student=function(student){
    this.user_id=student.user_id;
    
}
Student.create=(newStudent,result)=>{
    sql.query(`SELECT * FROM students WHERE user_id ='${newStudent.user_id}'`,(err,res)=>{
        if(res.length){
            result(null,{"status":"2","message":"Already Exists"})
        }else{
            sql.query("INSERT INTO students SET ?",newStudent,(err,res)=>{

                if(err){
                    console.log("error: ",err);
                    result(err,null);
                    return;
                }
                console.log("Created teacher: ",{id:res.insertId,...newStudent});
                result(null,{"status":"1","message":"Registered Successfull!!",id:res.insertId,...newStudent});
            });
        }
    });
};

Student.findById=(id,result)=>{
    sql.query(`SELECT students.*,users.*,students.id as sid FROM students INNER JOIN users ON students.user_id=users.id WHERE students.id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found students: ",res[0]);
            result(null,res[0]);
            return;

        }
        result({kind:"not found"},null);
    });
};
Student.findByUserId=(id,result)=>{
    sql.query(`SELECT students.*,users.*,students.id as sid FROM students INNER JOIN users ON students.user_id=users.id WHERE students.user_id = ${id}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("found students: ",res[0]);
            result(null,res[0]);
            return;

        }
        result({kind:"not found"},null);
    });
};

Student.getAll=result=>{
    sql.query("SELECT students.*,users.*,students.id as sid FROM students INNER JOIN users ON students.user_id=users.id",(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("students: ",res);
        result(null,res);

    });
};

Student.remove=(id,result)=>{
    sql.query("DELETE FROM students WHERE id=?",id,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return; 
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted student with id: ", id);
        result(null, res);
    })
}


module.exports=Student;

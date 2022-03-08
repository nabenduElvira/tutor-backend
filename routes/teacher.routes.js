module.exports=app=>{
    const teachers=require("../controllers/teacher.controller.js");
    app.post("/teachers/add",teachers.create);

    app.get("/teachers",teachers.findAll);

    app.get("/teachers/:id",teachers.findOne);

    app.get("/teachersubject/:id",teachers.findSubject);

    app.get("/teachers/user/:id",teachers.findByuser);

    app.put("/teachers/:id",teachers.update);

    app.delete("/teachers/:id",teachers.delete);

    app.delete("/teachers",teachers.deleteAll);
}
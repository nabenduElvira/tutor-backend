module.exports=app=>{
    const students=require("../controllers/student.controller.js");
    app.post("/students/add",students.create);

    app.get("/students",students.findAll);

    app.get("/students/:id",students.findOne);

    app.get("/students/user/:id",students.findByuser);

    app.put("/students/:id",students.update);

    app.delete("/students/:id",students.delete);

    app.delete("/students",students.deleteAll);
}
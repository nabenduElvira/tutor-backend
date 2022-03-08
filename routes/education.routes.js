module.exports=app=>{
    const education=require("../controllers/education.controller.js");
    app.post("/educations/add",education.create);

    app.get("/educations",education.findAll);

    app.get("/educations/:id",education.findOne);

    app.get("/educations/teacher/:id",education.findByteacher);

    app.put("/educations/:id",education.update);

    app.delete("/educations/:id",education.delete);

    app.delete("/educations",education.deleteAll);
}
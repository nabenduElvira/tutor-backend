module.exports=app=>{
    const lessons=require("../controllers/lesson.controller.js");
    app.post("/lessons/add",lessons.create);

    app.get("/lessons",lessons.findAll);

    app.get("/lessons/:id",lessons.findOne);

    app.get("/lessons/teacher/:id",lessons.findByteacher);

    app.put("/lessons/:id",lessons.update);

    app.delete("/lessons/:id",lessons.delete);

    app.delete("/lessons",lessons.deleteAll);
}
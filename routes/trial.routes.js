module.exports=app=>{
    const trials=require("../controllers/trial.controller.js");
    app.post("/trials/add",trials.create);

    app.get("/trials",trials.findAll);

    app.get("/trials/:id",trials.findOne);

    app.get("/trials/teacher/:id",trials.findByteacher);

    app.get("/trials/student/:id",trials.findBystudent);

    app.put("/trials/:id",trials.update);

    app.delete("/trials/:id",trials.delete);

    app.delete("/trials",trials.deleteAll);
}
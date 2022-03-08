module.exports=app=>{
    const schedule=require("../controllers/schedule.controller.js");
    app.post("/schedule/add",schedule.create);

    app.get("/schedule",schedule.findAll);

  app.get("/schedule/teacher/:id", schedule.findByteacher);

    // app.get("/accents/:id",accent.findOne);

    // app.put("/accents/:id",accent.update);

    // app.delete("/accents/:id",accent.delete);

    // app.delete("/accents",accent.deleteAll);
}
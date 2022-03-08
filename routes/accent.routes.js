module.exports=app=>{
    const accent=require("../controllers/accent.controller.js");
    app.post("/accents/add",accent.create);

    app.get("/accents",accent.findAll);

    app.get("/accents/:id",accent.findOne);

    app.put("/accents/:id",accent.update);

    app.delete("/accents/:id",accent.delete);

    app.delete("/accents",accent.deleteAll);
}
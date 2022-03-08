module.exports=app=>{
    const language=require("../controllers/language.controller.js");
    app.post("/languages/add",language.create);

    app.get("/languages",language.findAll);

    app.get("/languages/:id",language.findOne);

    app.put("/languages/:id",language.update);

    app.delete("/languages/:id",language.delete);

    app.delete("/languages",language.deleteAll);
}
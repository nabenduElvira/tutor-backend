module.exports=app=>{
    const teach=require("../controllers/teaches.controller.js");
    app.post("/teachs/add",teach.create);

    app.get("/teachs",teach.findAll);

    app.get("/teachs/:id",teach.findOne);

    app.put("/teachs/:id",teach.update);

    app.delete("/teachs/:id",teach.delete);

    app.delete("/teachs",teach.deleteAll);
}
module.exports=app=>{
    const subject=require("../controllers/subject.controller.js");
    app.post("/subjects/add",subject.create);

    app.get("/subjects",subject.findAll);

    app.get("/subjects/:id",subject.findOne);

    app.put("/subjects/:id",subject.update);

    app.delete("/subjects/:id",subject.delete);

    app.delete("/subjects",subject.deleteAll);
}
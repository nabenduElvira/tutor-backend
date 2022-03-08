module.exports=app=>{
    const experience=require("../controllers/experience.controller.js");
    app.post("/experience/add",experience.create);
    
    app.get("/experience/teacher/:id",experience.findByteacher);
    
    app.delete("/experience/:id",experience.delete);


}
module.exports=app=>{
    const certification=require("../controllers/certification.controller.js");
    app.post("/certification/add",certification.create);
    
    app.get("/certification/teacher/:id",certification.findByteacher);
    
    app.delete("/certification/:id",certification.delete);


}
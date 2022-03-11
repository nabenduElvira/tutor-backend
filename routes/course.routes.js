module.exports=app=>{
    const courses=require("../controllers/course.controller.js");

    app.get("/courses",courses.findAll);

}
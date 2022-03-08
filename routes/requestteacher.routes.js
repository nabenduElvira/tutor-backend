module.exports=app=>{
    const request_teachers=require('../controllers/requestteacher.controller.js');
    app.post("/request_teachers/add",request_teachers.create);
    
    app.get("/request_teachers",request_teachers.findAll);

    app.get("/request_teachers/:id",request_teachers.findOne);

    // Get Students Request Find By Student Id
    app.get("/request_teacher/:id",request_teachers.findOnee);

}


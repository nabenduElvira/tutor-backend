module.exports=app=>{
    const privatelessons=require('../controllers/private_lessons.controller.js');
    app.post("/private_lesson/add",privatelessons.create);

     // // Get Teacher private lessons Find By Teacher Id

     app.get("/private_lesson/:id",privatelessons.findOnee);
    
    // app.get("/request_teachers",request_teachers.findAll);

    // app.get("/request_teachers/:id",request_teachers.findOne);

   

}

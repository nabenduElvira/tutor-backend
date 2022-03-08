module.exports=app=>{
    const schedule=require("../controllers/schedule_booking.controller.js");
    app.post("/schedule-booking/add",schedule.create);

    app.get("/schedule-booking",schedule.findAll);

    app.get("/schedule-booking/student/:id", schedule.findBystudent);
    app.get("/schedule-booking/teacher/:id", schedule.findByTeacher);
    app.get("/schedule-booking/link/:id", schedule.findByLinkId);

    // app.get("/accents/:id",accent.findOne);

    // app.put("/accents/:id",accent.update);

    // app.delete("/accents/:id",accent.delete);

    // app.delete("/accents",accent.deleteAll);
}
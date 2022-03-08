module.exports=app=>{
    const notification=require("../controllers/notification.controller.js");
    app.post("/notification/add",notification.create);

    app.get("/notification",notification.findAll);

    app.get("/notification/:id",notification.findOne);

    app.get("/notification/user/:id",notification.findByUser);

    app.put("/notification/:id",notification.update);

    // app.delete("/lessons/:id",lessons.delete);

    // app.delete("/lessons",lessons.deleteAll);
}
module.exports=app=>{
    const users=require("../controllers/user.controller.js");
    app.post("/register",users.register);
    app.post("/user/change-password",users.changepassword);
    app.post("/user/forgot-password",users.forgotpassword);

    app.get("/users",users.findAll);

    app.get("/users/:user_id",users.findOne);

    app.put("/users/:user_id",users.update);
    app.put("/users/image/:user_id",users.imagechange);

    app.delete("/users/:user_id",users.delete);

    app.delete("/users",users.deleteAll);

    app.post("/login",users.login);
    app.post("/fblogin",users.fblogin);
    app.post("/glogin",users.googlelogin);
}
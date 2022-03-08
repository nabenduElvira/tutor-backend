module.exports=app=>{
    const chats=require("../controllers/chat.controller.js");
    app.post("/chat/add",chats.create);

    app.post("/chats",chats.findByUser);

}
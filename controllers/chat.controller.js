const Chat=require("../models/chat.model.js");

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      if(req.body.msg != null && req.body.from_id != null && req.body.to_id != null){
      const chat = new Chat({
        from_id: req.body.from_id,
        to_id: req.body.to_id,
        msg:req.body.msg,
      });
    
      // Save Customer in the database
      Chat.create(chat, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Teacher."
          });
        else res.send(data);
      });
  }else{
  	res.status(500).send({
            message:
              err.message || "Please Provide From Id, To Id And Msg."
          });
  }
};

exports.findByUser=(req,res)=>{
    if((req.body.from_id != null) && (req.body.to_id != null)){
    Chat.findByUser(req.body.from_id,req.body.to_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Chats with id ${req.body.from_id} And ${req.body.to_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Chat with id " + req.body.from_id+" and "+req.body.to_id
            });
          }
        } else res.send(data);
      });
    }
}


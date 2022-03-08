const Notification=require("../models/notification.model.js");

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      
      const notification = new Notification({
        user_id: req.body.user_id != null ? req.body.user_id : "",
        msg: req.body.msg != null ? req.body.msg : "",


       
      });
    
      // Save Customer in the database
      Notification.create(notification, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Accent."
          });
        else res.send(data);
      });
  
};
exports.findAll=(req,res)=>{
    Notification.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Lessons."
          });
        else res.send(data);
      });
};



exports.findByUser = (req, res) => {
  Notification.findByUserId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Schedule Booking with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Schedule Booking with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};



exports.findOne=(req,res)=>{
    Notification.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Notification with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Notification with id " + req.params.id
            });
          }
        } else res.send(data);
      });
}


exports.update=(req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Notification.updateById(
    req.params.id,
    new Notification(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Notification with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Notification with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
}
exports.delete=(req,res)=>{
    Accent.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Lesson with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Accent with id " + req.params.id
            });
          }
        } else res.send({ message: `Accent was deleted successfully!` });
      });
};
exports.deleteAll=(req,res)=>{
    Accent.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all lesson."
          });
        else res.send({ message: `All Accent were deleted successfully!` });
      });
}

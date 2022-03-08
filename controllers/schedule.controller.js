const Schedule=require("../models/schedule.model.js");

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      if(req.body.title != null){
      const schedule = new Schedule({
        title: req.body.title != null ? req.body.title : "",
        start: req.body.start != null ? req.body.start : "",
        end: req.body.end != null ? req.body.end : "",
        teacher_id: req.body.teacher_id != null ? req.body.teacher_id : "",
 
      });
    
      // Save Customer in the database
      Schedule.create(schedule, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Accent."
          });
        else res.send(data);
      });
  }else{
  	res.status(500).send({
            message:
              err.message || "Please Provide Accent Id."
          });
  }
};
exports.findAll=(req,res)=>{
    Schedule.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Lessons."
          });
        else res.send(data);
      });
};



exports.findByteacher = (req, res) => {
  Schedule.findByTeacherId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Schedule with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Schedule with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};



exports.findOne=(req,res)=>{
    Accent.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Accent with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Accent with id " + req.params.id
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

  Accent.updateById(
    req.params.id,
    new Accent(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Accent with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Accent with id " + req.params.id
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

const Lesson=require("../models/lesson.model.js");

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      if(req.body.teacher_id != null){
      const lesson = new Lesson({
        title: req.body.title != null ? req.body.title : "",
        time: req.body.time != null ? req.body.time : "",
        teacher_id:req.body.teacher_id != null ? req.body.teacher_id : "",
        subject:req.body.subject != null ? req.body.subject : "",
        quantity: req.body.quantity != null ? req.body.quantity : "",
        price: req.body.price != null ? req.body.price : "",
      });
    
      // Save Customer in the database
      Lesson.create(lesson, (err, data) => {
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
              err.message || "Please Provide Teacher Id."
          });
  }
};
exports.findAll=(req,res)=>{
    Lesson.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Lessons."
          });
        else res.send(data);
      });
};

exports.findOne=(req,res)=>{
    Lesson.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Lesson with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Lesson with id " + req.params.id
            });
          }
        } else res.send(data);
      });
}
exports.findByteacher=(req,res)=>{
  Lesson.findByTeacherId(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with id " + req.params.id
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

  Lesson.updateById(
    req.params.id,
    new Lesson(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Lesson with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Lesson with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
}
exports.delete=(req,res)=>{
    Lesson.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Lesson with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Lesson with id " + req.params.id
            });
          }
        } else res.send({ message: `Lesson was deleted successfully!` });
      });
};
exports.deleteAll=(req,res)=>{
    Lesson.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all lesson."
          });
        else res.send({ message: `All lesson were deleted successfully!` });
      });
}

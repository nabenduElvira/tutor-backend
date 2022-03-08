const Subject=require("../models/subject.model.js");

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      if(req.body.name != null){
      const subject = new Subject({
        name: req.body.name != null ? req.body.name : "",
       
      });
    
      // Save Customer in the database
      Subject.create(subject, (err, data) => {
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
    Subject.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Lessons."
          });
        else res.send(data);
      });
};
exports.findOne=(req,res)=>{
    Subject.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Subject with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Subject with id " + req.params.id
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

  Subject.updateById(
    req.params.id,
    new Subject(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Subject with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Subject with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
}
exports.delete=(req,res)=>{
    Subject.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Lesson with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Subject with id " + req.params.id
            });
          }
        } else res.send({ message: `Subject was deleted successfully!` });
      });
};
exports.deleteAll=(req,res)=>{
    Subject.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all lesson."
          });
        else res.send({ message: `All Subject were deleted successfully!` });
      });
}

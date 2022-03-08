const Teach=require("../models/teaches.model.js");

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      if(req.body.name != null){
      const teach = new Teach({
        name: req.body.name != null ? req.body.name : "",
       
      });
    
      // Save Customer in the database
      Teach.create(teach, (err, data) => {
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
    Teach.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Lessons."
          });
        else res.send(data);
      });
};
exports.findOne=(req,res)=>{
    Teach.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Teach with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Teach with id " + req.params.id
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

  Teach.updateById(
    req.params.id,
    new Teach(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Teach with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Teach with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
}
exports.delete=(req,res)=>{
    Teach.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Lesson with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Teach with id " + req.params.id
            });
          }
        } else res.send({ message: `Teach was deleted successfully!` });
      });
};
exports.deleteAll=(req,res)=>{
    Teach.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all lesson."
          });
        else res.send({ message: `All Teach were deleted successfully!` });
      });
}

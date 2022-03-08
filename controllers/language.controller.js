const Language=require("../models/language.model.js");

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      if(req.body.name != null){
      const language = new Language({
        name: req.body.name != null ? req.body.name : "",
       
      });
    
      // Save Customer in the database
      Language.create(language, (err, data) => {
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
    Language.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Lessons."
          });
        else res.send(data);
      });
};
exports.findOne=(req,res)=>{
    Language.findById(req.params.id, (err, data) => {
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

  Language.updateById(
    req.params.id,
    new Language(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Language with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Language with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
}
exports.delete=(req,res)=>{
    Language.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Language with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Language with id " + req.params.id
            });
          }
        } else res.send({ message: `Language was deleted successfully!` });
      });
};
exports.deleteAll=(req,res)=>{
    Language.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all language."
          });
        else res.send({ message: `All language were deleted successfully!` });
      });
}

const Certification=require("../models/certification.model.js");

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      if(req.body.teacher_id != null){
          var file_name=""
          if (req.files && Object.keys(req.files).length !== 0) {
                if (req.files.upload_doc) {
                  let uploadedFile = req.files.upload_doc;
                  var image_name = uploadedFile.name;
                  let filenameSplit = image_name.split(".");
                  let fileExtension = filenameSplit[filenameSplit.length - 1];
                  image_name = "uploaded-doc" + "_" + Date.now() + "." + fileExtension;
                  file_name=image_name;
                  uploadedFile.mv("public/images/uploads/" + image_name, (err) => {
                      file_name=image_name;
                    if (err) {
                      return res.status(500).send(err);
                    }
                  });
                }
        }
          
          
      const certification = new Certification({
        title: req.body.title != null ? req.body.title : "",
        name: req.body.name != null ? req.body.name : "",
        teacher_id:req.body.teacher_id != null ? req.body.teacher_id : "",
        from_year:req.body.from_year != null ? req.body.from_year : "",
        to_year: req.body.to_year != null ? req.body.to_year : "",
        upload_doc: file_name,
      });
    
      // Save Customer in the database
      Certification.create(certification, (err, data) => {
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


exports.findByteacher=(req,res)=>{
  Certification.findByTeacherId(req.params.id, (err, data) => {
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
};

exports.delete=(req,res)=>{
    Certification.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Certification with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Certification with id " + req.params.id
            });
          }
        } else res.send({ message: `Certification was deleted successfully!` });
      });
};
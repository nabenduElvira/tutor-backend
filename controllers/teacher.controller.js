const Teacher=require("../models/teacher.model.js");
const User=require("../models/user.model.js");
exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      if(req.body.user_id != null){
      const teacher = new Teacher({
        user_id: req.body.user_id != null ? req.body.user_id : "",
        teaches: req.body.teaches != null ? req.body.teaches : "",
        teaches_from:req.body.teaches_from != null ? req.body.teaches_from : "",
        topics: req.body.topics != null ? req.body.topics : "",
        about: req.body.about != null ? req.body.about : "",
        location:req.body.location != null ? req.body.location : "",
        response_time: req.body.response_time != null ? req.body.response_time : "",
        ratting:req.body.ratting != null ? req.body.ratting : "",
        accents:req.body.accents != null ? req.body.accents : "",
        lession_include:req.body.lession_include != null ? req.body.lession_include : "",
        subject:req.body.subject != null ? req.body.subject : "",
        education:req.body.education != null ? req.body.education : "",
        work_exp:req.body.work_exp != null ? req.body.work_exp : "",
        certificate:req.body.certificate != null ? req.body.certificate : "",
        youtube_id:req.body.youtube_id != null ? req.body.youtube_id : "",
        upload_video:req.body.upload_video != null ? req.body.upload_video : "",
      });
    
      // Save Customer in the database
      Teacher.create(teacher, (err, data) => {
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
              err.message || "Please Provide User Id."
          });
  }
};
exports.findAll=(req,res)=>{
    Teacher.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.send(data);
      });
};
exports.findOne=(req,res)=>{
    Teacher.findById(req.params.id, (err, data) => {
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

exports.findByuser=(req,res)=>{
  Teacher.findByUserId(req.params.id, (err, data) => {
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


exports.findSubject=(req,res)=>{
  Teacher.getTeacherSubject(req.params.id, (err, data) => {
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

  Teacher.updateById(
    req.params.id,
    new Teacher(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Teacher with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Teacher with id " + req.params.id
          });
        }
      } else{
          //console.log(req.body);
          //res.send(req.body);
          User.updateById(
              req.body.user_id,new User(req.body),(err,data)=>{
                  if(err){
                      res.send(err);
                  }
                  console.log(data);
                  res.send(data);
              }
              );
          //res.send(data);
          
      }
    }
  );
}
exports.delete=(req,res)=>{
    Teacher.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Teacher with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Teacher with id " + req.params.id
            });
          }
        } else res.send({ message: `Teacher was deleted successfully!` });
      });
};
exports.deleteAll=(req,res)=>{
    Teacher.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all teachers."
          });
        else res.send({ message: `All Teachers were deleted successfully!` });
      });
}

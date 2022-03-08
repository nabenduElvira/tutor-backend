const Trial=require("../models/trial.model.js");

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

      // Create a Trail
      const trial = new Trial({
        student_id: req.body.student_id != null ? req.body.student_id : "",
        teacher_id: req.body.teacher_id != null ? req.body.teacher_id : "",
        start_times: req.body.start_times != null ? req.body.start_times : "",
        end_times: req.body.end_times != null ? req.body.end_times : "",
        lessons:req.body.lessons != null ? req.body.lessons : "",
        class_type:req.body.class_type != null ? req.body.class_type : "",
        users:req.body.users != null ? req.body.users : "",
        links:req.body.links != null ? req.body.links : "",        
      });

      // Trial.create(trial, (err, data) => {
      //   if (err)
      //     res.status(500).send({
      //       message:
      //         "Some error occurred while creating the trial."
      //     });
      //   else res.send(data);
      // });

      Trial.create(trial,(err, data)=>{
        if(data)
          res.status(200).send({

          })
      })


  //     // Create a Customer
  //     if(req.body.teacher_id != null){
  //     const trial = new Trial({
  //       student_id: req.body.student_id != null ? req.body.student_id : "",
  //       teacher_id: req.body.teacher_id != null ? req.body.teacher_id : "",
  //       start_times: req.body.start_times != null ? req.body.start_times : "",
  //       end_times: req.body.end_times != null ? req.body.end_times : "",
  //       lessons:req.body.lessons != null ? req.body.lessons : "",
  //       users:req.body.users != null ? req.body.users : "",
  //       links:req.body.links != null ? req.body.links : "",
  //       type:req.body.type != null ? req.body.type : "",
  //     });
      
  //     // Save Customer in the database
  //     Trial.create(trial, (err, data) => {
  //       if (err)
  //         res.status(500).send({
  //           message:
  //             err.message || "Some error occurred while creating the Teacher."
  //         });
  //       else res.send(data);
  //     });
  // }else{
  // 	res.status(500).send({
  //           message:
  //             err.message || "Please Provide Teacher Id."
  //         });
  // }
};


exports.findBystudent=(req,res)=>{
  Trial.findByStudentId(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Trial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Trial with id " + req.params.id
            });
          }
        } else res.send(data);
      });
}

exports.findAll=(req,res)=>{
    Trial.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Lessons."
          });
        else res.send(data);
      });
};
exports.findOne=(req,res)=>{
    Trial.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Trial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Trial with id " + req.params.id
            });
          }
        } else res.send(data);
      });
}
exports.findByteacher=(req,res)=>{
  Trial.findByTeacherId(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Trial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Trial with id " + req.params.id
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

  Trial.updateById(
    req.params.id,
    new Trial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Trial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Trial with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
}
exports.delete=(req,res)=>{
    Trial.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Trial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Trial with id " + req.params.id
            });
          }
        } else res.send({ message: `Trial was deleted successfully!` });
      });
};
exports.deleteAll=(req,res)=>{
    Trial.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all lesson."
          });
        else res.send({ message: `All lesson were deleted successfully!` });
      });
}

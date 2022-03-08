const RequestTeacher=require("../models/requestteacher.model.js");

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Subject
      if(req.body.student_id != null){
      const requestTeacher = new RequestTeacher({
        subject: req.body.subject != null ? req.body.subject : "",
        description: req.body.description != null ? req.body.description : "",
        student_id:req.body.student_id != null ? req.body.student_id : "",
      });
    
      // Save Customer in the database
      RequestTeacher.create(requestTeacher, (err, data) => {
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
              err.message || "Please Provide Student Id."
          });
  }
};


exports.findOnee=(req,res)=>{
  RequestTeacher.findId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Student with id " + req.params.id
          });
        }
      } else res.send(data);
    });
}


exports.findOne=(req,res)=>{
  RequestTeacher.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Student with id " + req.params.id
          });
        }
      } else res.send(data);
    });
}


// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }else{
//     const requestTeacher = new RequestTeacher({
//       subject: req.body.subject,
//       description: req.body.description,
//       student_id:req.body.student_id,
//     });

//      // Save Request Teacher in the database
//      RequestTeacher.create(requestTeacher, (err, data) => {
//   if (err)
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while creating the Tutorial."
//     });
//   else res.send(data);
// });
// }
// }

exports.findAll=(req,res)=>{
  RequestTeacher.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Lessons."
        });
      else res.send(data);
    });
};
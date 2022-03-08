const Student=require("../models/student.model.js");
const User=require("../models/user.model.js");

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      if(req.body.user_id != null){
      const student = new Student({
        user_id: req.body.user_id != null ? req.body.user_id : "",
      
      });
      
      
    
      // Save Customer in the database
      Student.create(student, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Student."
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
    Student.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.send(data);
      });
};
exports.findOne=(req,res)=>{
    Student.findById(req.params.id, (err, data) => {
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
exports.findByuser=(req,res)=>{
  Student.findByUserId(req.params.id, (err, data) => {
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

exports.update=(req,res)=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  
      Student.findByUserId(req.params.id, (err, data) => {
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
        } else{
            User.updateById(data.user_id,req.body,(err,data)=>{
                 res.send(data);
            });
        }
       
      
      });
       
  

  
//   Student.updateById(
//     req.params.id,
//     new Student(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Student with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Student with id " + req.params.id
//           });
//         }
//       } else res.send(data);
//     }
//   );
}
exports.delete=(req,res)=>{
    Student.findById(req.params.id, (err, data) => {
         //res.send(data.user_id);
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
                } else {
                    
                   
                    User.remove(data.user_id,(err,data)=>{
                        Student.remove(req.params.id, (err, data) => {
                            if (err) {
                              if (err.kind === "not_found") {
                                res.status(404).send({
                                  message: `Not found Student with id ${req.params.id}.`
                                });
                              } else {
                                res.status(500).send({
                                  message: "Could not delete Student with id " + req.params.id
                                });
                              }
                            } else{
                                 
                                 res.send({ message: `Student was deleted successfully!` });
                            }
                          });
                         res.send({ message: `Student was deleted successfully!` });
                    })
                }
                    
              });
    
};
exports.deleteAll=(req,res)=>{
    Student.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all students."
          });
        else res.send({ message: `All Students were deleted successfully!` });
      });
}

const JobRequest=require("../models/jobrequest.model.js");

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a request for job
      
      const jobrequest = new JobRequest({
        request_id: req.body.request_id != null ? req.body.request_id : "",
        teacher_id: req.body.teacher_id != null ? req.body.teacher_id : "",
        request: req.body.request != null ? req.body.request : "",
      });
    
      // Save job in the database
      JobRequest.create(jobrequest, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              "Some error occurred while creating the Teacher."
          });
        else res.send(data);
      });
  
};

exports.findAll=(req,res)=>{
  JobRequest.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Lessons."
        });
      else res.send(data);
    });
};


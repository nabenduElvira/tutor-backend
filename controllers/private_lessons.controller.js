const Privatelesson=require("../models/private_lesson.model.js");

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a request for job
      
      const private_lesson = new Privatelesson({
        teacher_id: req.body.teacher_id != null ? req.body.teacher_id : "",
        subject: req.body.subject != null ? req.body.subject : "",
        lessons: req.body.lessons != null ? req.body.lessons : "",
        amount: req.body.amount !=null ? req.body.amount : "",
      });

      // Save job in the database
      Privatelesson.create(private_lesson, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              "Some error occurred while creating the private_lessons."
          });
        else res.send(data);
      });
  
};


exports.findOnee=(req,res)=>{
  Privatelesson.findId(req.params.id, (err, data) => {
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

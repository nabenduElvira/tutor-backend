const ScheduleBooking=require("../models/schedule_booking.model.js");

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      
      const schedule = new ScheduleBooking({
        schedule_id: req.body.schedule_id != null ? req.body.schedule_id : "",
        student_id: req.body.student_id != null ? req.body.student_id : "",
        linkid:String(Math.floor(100000 + Math.random() * 900000))+"-"+req.body.schedule_id+"-"+req.body.student_id,

       
      });
    
      // Save Customer in the database
      ScheduleBooking.create(schedule, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Accent."
          });
        else res.send(data);
      });
  
};
exports.findAll=(req,res)=>{
    ScheduleBooking.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Lessons."
          });
        else res.send(data);
      });
};



exports.findBystudent = (req, res) => {
    const page = req.query.page ? req.query.page : 1;
  ScheduleBooking.findByStudentId(req.params.id,page, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Schedule Booking with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Schedule Booking with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
exports.findByTeacher=(req,res)=>{
    const page = req.query.page ? req.query.page : 1;
    ScheduleBooking.findByteacherId(req.params.id,page,(err,data)=>{
        if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Schedule Booking with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Schedule Booking with id " + req.params.id,
        });
      }
    } else res.send(data);
    })
}
exports.findByLinkId=(req,res)=>{
    const page = req.query.page ? req.query.page : 1;
    ScheduleBooking.findByLinkId(req.params.id,page,(err,data)=>{
        if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Schedule Booking with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Schedule Booking with id " + req.params.id,
        });
      }
    } else res.send(data);
    })
}



exports.findOne=(req,res)=>{
    Accent.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Accent with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Accent with id " + req.params.id
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

  Accent.updateById(
    req.params.id,
    new Accent(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Accent with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Accent with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
}
exports.delete=(req,res)=>{
    Accent.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Lesson with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Accent with id " + req.params.id
            });
          }
        } else res.send({ message: `Accent was deleted successfully!` });
      });
};
exports.deleteAll=(req,res)=>{
    Accent.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all lesson."
          });
        else res.send({ message: `All Accent were deleted successfully!` });
      });
}

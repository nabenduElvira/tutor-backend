const Course=require("../models/course.model.js");

exports.findAll=(req,res)=>{
    Course.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Lessons."
          });
        else res.send(data);
      });
};
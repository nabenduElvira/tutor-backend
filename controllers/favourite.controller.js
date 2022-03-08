const Favourite = require("../models/favourite.model.js");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }
console.log(req.body);
  // Create a Favourite Teacher
  
  if (req.body.user_id != null) {
      
      Favourite.findByTeacherUserId(req.body.teacher_id,req.body.user_id, (err, data) => {
          //console.log(data);
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Favourite with id ${req.body.teacher_id}.`,
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Favourite with id " + req.body.teacher_id,
            });
          }
        } else{
            // console.log(data.status);
            // res.send(data.status);
            
            if(typeof data.status=="undefined"){
            data=data[0];
            // console.log("undefineed data");
            // console.log(data.status);
            }
            
           
           
            
            if(data.status=='1'){
                //res.send(data);
                
                    Favourite.remove(data.data.id, (err, data) => {
                        
                    if (err) {
                         
                      res.send(err);
                    } else res.send({ message: `Trial was deleted successfully!` });
                  });
               
                
            }else if(data.status=='2'){
            
                
                const favourite = new Favourite({
                  user_id: req.body.user_id != null ? req.body.user_id : "",
                  teacher_id: req.body.teacher_id != null ? req.body.teacher_id : "",
                });
            
                // Save Favourite Teacher in the database
                Favourite.create(favourite, (err, data) => {
                  if (err)
                    res.status(500).send({
                      message:
                        err.message ||
                        "Some error occurred while creating the Favourite Teacher.",
                    });
                  else res.send(data);
                });
            }
            
        }
      });
      
      
    
  } else {
    res.status(500).send({
      message: "Please Provide User Id.",
    });
  }
};

exports.findAll = (req, res) => {
  Favourite.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Favourites.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Favourite.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Favourite with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Favourite with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.findByteacher = (req, res) => {
  Favourite.findByTeacherId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Favourite with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Favourite with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.findByUser = (req, res) => {
  Favourite.findByUserId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Favourite with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Favourite with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Favourite.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Trial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Trial with id " + req.params.id,
        });
      }
    } else res.send({ message: `Trial was deleted successfully!` });
  });
};

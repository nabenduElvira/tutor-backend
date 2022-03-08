var md5=require("md5");
const transporter=require("../config/mail.config.js");
//console.log(transporter.sendMail());
const User=require("../models/user.model.js");
const Teacher=require("../models/teacher.model.js");
const Student=require("../models/student.model.js");

exports.register=(req,res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      const user = new User({
        first_name: req.body.first_name != null ? req.body.first_name : "",
        last_name: req.body.last_name != null ? req.body.last_name : "",
        type:req.body.type != null ? req.body.type : "",
        gender:req.body.gender != null ? req.body.gender : "",
        email: req.body.email != null ? req.body.email : "",
        phone: req.body.phone != null ? req.body.phone : "",
        password: req.body.password != null ? md5(req.body.password) : "",
        facebookid:req.body.facebookid != null ? req.body.facebookid : "",
        googleid:req.body.googleid != null ? req.body.googleid : "",
      });
    
      // Save Customer in the database
      User.create(user, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        else{
            if(req.body.type==1){
            const teacher = new Teacher({
            user_id: data.id
            });
            Teacher.create(teacher, (err, teacherdata) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Teacher."
              });
            //else res.send(data);
          });
            }else{
            const student = new Student({
            user_id: data.id
            });
            Student.create(student, (err, studentdata) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Student."
              });
            //else res.send(data);
          });
            }
                
            res.send(data);
            
        }
      });
};
exports.login=(req,res)=>{
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  User.login(req.body.email,md5(req.body.password),(err,data)=>{
    if (err)
      res.status(500).send({
        message:
          data || "Some error occurred while creating the User."
      });
    else res.send(data);
  })
};

exports.imagechange=(req,res)=>{
     if (req.files && Object.keys(req.files).length !== 0) {
        if (req.files.image) {
          let uploadedFile = req.files.image;
          var image_name = uploadedFile.name;
          let filenameSplit = image_name.split(".");
          let fileExtension = filenameSplit[filenameSplit.length - 1];
          image_name = "profile-pic" + "_" + Date.now() + "." + fileExtension;
          uploadedFile.mv("public/images/uploads/" + image_name, (err) => {
            if (err) {
              return res.status(500).send(err);
            }
            
            var userUpdate={};
            userUpdate.image=image_name;
            User.updateById(
                req.params.user_id,
                new User(userUpdate),(err,data)=>{
                    console.log(data);
                    if(err){
                    if (err.kind === "not_found") {
                      res.status(404).send({
                        message: `Not found User with id ${req.params.user_id}.`
                      });
                    }
                    }else{
                        return res.send(data);
                    }
                }
                );
          });
        }
  }else{
      var userUpdate={};
            userUpdate.image='';
            User.updateById(
                req.params.user_id,
                new User(userUpdate),(err,data)=>{
                    console.log(data);
                    if(err){
                    if (err.kind === "not_found") {
                      res.status(404).send({
                        message: `Not found User with id ${req.params.user_id}.`
                      });
                    }
                    }else{
                        return res.send(data);
                    }
                }
                );
  }
};

exports.fblogin=(req,res)=>{
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  User.fblogin(req.body.facebookid,(err,data)=>{
    if (err)
      res.status(500).send({
        message:
          data || "Some error occurred while creating the User."
      });
    else res.send(data);
  })
}
exports.googlelogin=(req,res)=>{
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  User.googlelogin(req.body.googleid,(err,data)=>{
    if (err)
      res.status(500).send({
        message:
          data || "Some error occurred while creating the User."
      });
    else res.send(data);
  })
}
exports.findAll=(req,res)=>{
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.send(data);
      });
};
exports.findOne=(req,res)=>{
    User.findById(req.params.user_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.user_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with id " + req.params.user_id
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
    
    if (req.files && Object.keys(req.files).length !== 0) {
        if (req.files.image) {
          let uploadedFile = req.files.image;
          var image_name = uploadedFile.name;
          let filenameSplit = image_name.split(".");
          let fileExtension = filenameSplit[filenameSplit.length - 1];
          image_name = "profile-pic" + "_" + Date.now() + "." + fileExtension;
          uploadedFile.mv("public/images/uploads/" + image_name, (err) => {
            if (err) {
              return res.status(500).send(err);
            }
            
            var userUpdate={};
            userUpdate.image=image_name;
            User.updateById(
                req.params.user_id,
                new User(userUpdate),(err,data)=>{
                    if (err.kind === "not_found") {
                      res.status(404).send({
                        message: `Not found User with id ${req.params.user_id}.`
                      });
                    }
                }
                );
          });
        }
  }
    
    
  User.updateById(
    req.params.user_id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.user_id
          });
        }
      } else res.send(data);
    }
  );

}
exports.changepassword=(req,res)=>{
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  User.changepassword(
    req.body.user_id,
    md5(req.body.password),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.user_id
          });
        }
      } else res.send(data);
    }
  );

}
exports.forgotpassword=(req,res)=>{
    if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  var user={};
  user.email=req.body.email;
  user.password=md5(Math.random().toString(36).slice(-8));
  User.forgotpassword(user,(err,data)=>{
      if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.body.email}.`
            });
          } else {
            res.status(500).send({
              message: "Could not update Customer with id " + req.body.email
            });
          }
        } else{ 
            
             var mailOptions = {
                from: 'Glitcher <noreply@elvirainfotech.org>',
                to: user.email,
                subject: 'Glitcher App Forgot Password',
                html: '<b>Glitcher App Forgot Password</b><br/>Your Changed Password Is : <br><h1>' + user.password + '</h1>'
            };
            console.log(transporter);
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.json({ status: '2', msg: 'Sorry! Mail not send' });
                }
                 res.send({ message: `User was updated successfully!` });
            });
                            
           
            
        }
  })
}
exports.delete=(req,res)=>{
    User.remove(req.params.user_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.user_id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Customer with id " + req.params.user_id
            });
          }
        } else res.send({ message: `User was deleted successfully!` });
      });
};
exports.deleteAll=(req,res)=>{
    User.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
        else res.send({ message: `All Users were deleted successfully!` });
      });
}
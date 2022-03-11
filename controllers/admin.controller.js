var base64 = require("base-64");
var md5 = require("md5");
const Teacher = require("../models/teacher.model.js");
const Student = require("../models/student.model.js");
const User = require("../models/user.model.js");
const Teach = require("../models/teaches.model.js");
const Course = require("../models/course.model.js");
const path = require("path");
const multer = require("multer");
exports.index = (req, res) => {
  var sess = req.session;
  if (sess.email) {
    res.redirect("/admin/login");
  }
  res.render("admin/index.ejs");
};
exports.login = (req, res) => {
  res.render("admin/login.ejs");
};
exports.postlogin = (req, res) => {
  var sess = req.session;
  console.log(req.body);
  var email = req.body.email;
  var password = req.body.password;
  //console.log(md5(base64.encode(password)));
  if (email == "admin@gmail.com" && password == "123456") {
    console.log("here");
    sess.email = email;
    res.redirect("/admin");
  } else {
    res.redirect("/admin/login");
  }
};

// create course
exports.create = (req, res) => {
  // Validate request

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Upload videos
  let uploadfile = req.files.videos;
  // console.log(req.files.videos.name);

  var image_name = uploadfile.name;
  let filenameSplit = image_name.split(".");
  let fileExtension = filenameSplit[filenameSplit.length - 1];
  image_name = "videos" + "_" + Date.now() + "." + fileExtension;
 // resize("public/images/uploads/" + image_name,image_name);
  uploadfile.mv("admin/public/images/uploads/" + image_name, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    else{
      const course = new Course({
        name: req.body.name,
        description: req.body.description,
        learn: req.body.learn,
        content: req.body.content,
        details: req.body.details,
        ratings: req.body.ratings,
        price: req.body.price,
        add_date: req.body.add_date,
        videos: uploadfile.name,
      });
      Course.create(course, (req,err, data) => {
        // if (err)
        //   res.status(500).send({
        //     message:
        //       err.message || "Some error occurred while creating the course."
        //   });
        // // else res.send(data);
        // else res.redirect('/admin/course'); 
        // if(course.videos){
          
        // }
      });
      res.redirect('/admin/course');
    } 
  });

  
};







exports.course = (req, res) => {
  var sess = req.session;
  if (sess.email) {
    res.redirect("/admin/login");
  }
  Course.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
      Teach.getAll((err) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Courses."
          });
        else {
            res.render("admin/course.ejs", {
                title: "",
                page: "",
                result: data,
              });
        }
      });
    
  });
};

exports.teacher = (req, res) => {
  var sess = req.session;
  if (sess.email) {
    res.redirect("/admin/login");
  }
  Teacher.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
      Teach.getAll((err, teachdata) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Lessons."
          });
        else {
            res.render("admin/teacher.ejs", {
                title: "",
                page: "",
                result: data,
                teaches:teachdata,
              });
        }
      });
    
  });
};


exports.student = (req, res) => {
    var sess = req.session;
    if (sess.email) {
      res.redirect("/admin/login");
    }
    Student.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      res.render("admin/student.ejs", {
        title: "",
        page: "",
        result: data,
      });
    });
  };

exports.UserstatusChange=(req,res)=>{
    User.findById(req.params.id, (err, data) => {
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
        } else {
            var status=data.status==0 ? 1 : 0;
            User.updateById(
                req.params.id,
                new User({'status':status}),
                (err, data) => {
                  if (err) {
                    if (err.kind === "not_found") {
                      res.status(404).send({
                        message: `Not found User with id ${req.params.id}.`
                      });
                    } else {
                      res.status(500).send({
                        message: "Error updating User with id " + req.params.id
                      });
                    }
                  } else {
                    res.redirect("back");
                  }
                }
              );
            
        }
      });
};
exports.editteacher=(req,res)=>{
    Teacher.updateById(
        req.body.id,
        new Teacher(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Teacher with id ${req.body.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Teacher with id " + req.body.id
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
                      //res.send(data);
                      res.redirect('back');
                  }
                  );
              //res.send(data);
              
          }
        }
      );
};

exports.deleteteacher=(req,res)=>{
    Teacher.remove(req.body.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Teacher with id ${req.body.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Teacher with id " + req.body.id
            });
          }
        } else{
            res.redirect('back');
        }
      });
}


exports.editcourse=(req,res)=>{
  Course.updateById(
      req.body.id,
      new Course(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Course with id ${req.body.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Course with id " + req.body.id
            });
          }
        } else{
            //console.log(req.body);
            //res.send(req.body);
            //res.send(data);
            res.redirect('back');
            
        }
      }
    );
};


exports.deletecourse=(req,res)=>{
  Course.remove(req.body.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found course with id ${req.body.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete course with id " + req.body.id
          });
        }
      } else{
          res.redirect('back');
      }
    });
}
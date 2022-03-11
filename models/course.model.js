const sql = require("./db.js");

const Course = function (course) {
    this.name = course.name;
    this.description = course.description;
    this.learn = course.learn;
    this.content = course.content;
    this.details = course.details;
    this.ratings = course.ratings;
    this.price = course.price;
    this.add_date = course.add_date;
    this.videos = course.videos;
}

Course.create = (newCourse, result) => {
    sql.query("INSERT INTO courses SET ?", newCourse, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created tutorial: ", { id: res.insertId, ...newCourse });
      result(null, { id: res.insertId, ...newCourse });
    });
  };


// find course by id

Course.updateById=(id,course,result)=>{
  var courseUpdate={};
  if(course.name != null){
      courseUpdate.name=course.name;
  }
  if(course.description != null){
      courseUpdate.description=course.description;
  }
  if(course.learn != null){
      courseUpdate.learn=course.learn;
  }
  if(course.content != null){
      courseUpdate.content=course.content;
  }
  if(course.details != null){
      courseUpdate.details=course.details;
  }
  if(course.ratings != null){
      courseUpdate.ratings=course.ratings;
  }
  if(course.price != null){
      courseUpdate.price=course.price;
  }

  if(course.add_date != null){
      courseUpdate.add_date=course.add_date;
  }
  if(course.videos != null){
      courseUpdate.videos=course.videos;
  }
  
  sql.query(
      "UPDATE courses SET ? WHERE id=?",[courseUpdate,id],(err,res)=>{
          if(err){
              console.log("error: ",err);
              result(null,err);
              return;
          }
          if(res.affectedRows==0){
              result({kind:"not_found"},null);
              return;
          }
          console.log("updated course: ",{id:id,...courseUpdate});
          result(null,{id:id,...courseUpdate});
      }
  )
}



Course.getAll = result => {
    sql.query("SELECT * FROM courses;", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("courses: ", res);
        result(null, res);

    });
};


Course.remove=(id,result)=>{
  sql.query("DELETE FROM courses WHERE id=?",id,(err,res)=>{
      if(err){
          console.log("error: ", err);
          result(null, err);
          return; 
      }
      if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
      }
      console.log("deleted course with id: ", id);
      result(null, res);
  })
}

module.exports = Course;
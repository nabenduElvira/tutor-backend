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
    // this.videos = course.videos;
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

module.exports = Course;
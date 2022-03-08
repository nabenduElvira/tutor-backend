const sql = require("./db.js");

const Favourite = function (favourite) {
  this.user_id = favourite.user_id;
  this.teacher_id = favourite.teacher_id;
};

Favourite.create = (newFavourite, result) => {
  sql.query("INSERT INTO favourite_teacher SET ?", newFavourite, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created favourite teacher: ", {
      id: res.insertId,
      ...newFavourite,
    });
    result(null, {
      status: "1",
      message: "Favourite teacher added Successfull!!",
      id: res.insertId,
      ...newFavourite,
    });
  });
};

Favourite.findById = (id, result) => {
  sql.query(
    `SELECT favourite_teacher.* FROM favourite_teacher WHERE favourite_teacher.id = ${id} `,
    (err, res) => {
      errors = [];

      if (err) {
        console.log("error: ", err);
        errors.push(err);
        result(errors, null);
        return;
      }

      if (res.length) {
        console.log("found favourate teacher: ", res[0]);
        var data = { status: "1", data: res[0] };
        // result(null, res[0]);
        result(null, data);

        return;
      }
      //err.message=
      errors.push({
        kind: "not found",
        status: "2",
        msg: "Favourite Teacher not found",
      });
      console.log(errors);
      result(null, errors);
    }
  );
};

Favourite.getAll = (result) => {
  sql.query("SELECT favourite_teacher.* FROM favourite_teacher", (err, res) => {
    errors = [];

    if (err) {
      console.log("error: ", err);
      errors.push(err);
      result(errors, null);
      return;
    }

    if (res.length) {
      console.log("found favourate teacher: ", res);
      var data = { status: "1", data: res };
      // result(null, res[0]);
      result(null, data);

      return;
    }
    //err.message=
    errors.push({
      kind: "not found",
      status: "2",
      msg: "Favourite Teachers not found",
    });
    console.log(errors);
    result(null, errors);
  });
};

Favourite.findByTeacherId = (id, result) => {
  sql.query(
    `SELECT favourite_teacher.* FROM favourite_teacher WHERE favourite_teacher.teacher_id = ${id} `,
    (err, res) => {
      errors = [];
      if (err) {
        console.log("error: ", err);
        errors.push(err);
        result(errors, null);
        return;
      }
      if (res.length) {
        console.log("found Favourite teacher: ", res);
        var data = { status: "1", data: res };
        result(null, data);
        return;
      }
      //   result({ kind: "not found" }, null);
      //err.message=
      errors.push({
        kind: "not found",
        status: "2",
        msg: `Data not found with Teacher Id ${id} `,
      });
      console.log(errors);
      result(null, errors);
    }
  );
};
Favourite.findByTeacherUserId = (teacherid,user_id, result) => {
  sql.query(
    `SELECT favourite_teacher.* FROM favourite_teacher WHERE favourite_teacher.teacher_id = ${teacherid} AND favourite_teacher.user_id=${user_id}`,
    (err, res) => {
      errors = [];
      if (err) {
        console.log("error: ", err);
        errors.push(err);
        result(errors, null);
        return;
      }
      if (res.length) {
        console.log("found Favourite teacher: ", res);
        var data = { status: "1", data: res[0] };
        result(null, data);
        return;
      }
      //   result({ kind: "not found" }, null);
      //err.message=
      errors.push({
        kind: "not found",
        status: "2",
        msg: `Data not found with Teacher Id ${teacherid} `,
      });
      console.log(errors);
      result(null, errors);
    }
  );
};

Favourite.findByUserId = (id, result) => {
  sql.query(
    `SELECT favourite_teacher.id as favourite_teacher_id,users.first_name,users.last_name,teachers.* FROM favourite_teacher INNER JOIN teachers ON teachers.id=favourite_teacher.teacher_id INNER JOIN users ON users.id=teachers.user_id WHERE favourite_teacher.user_id= ${id} `,
    (err, res) => {
      errors = [];
      if (err) {
        console.log("error: ", err);
        errors.push(err);
        result(errors, null);
        return;
      }
      if (res.length) {
        console.log("found Favourite teacher: ", res);
        var data = { status: "1", data: res };
        result(null, data);
        return;
      }
      //   result({ kind: "not found" }, null);
      //err.message=
      errors.push({
        kind: "not found",
        status: "2",
        msg: `Data not found with User Id ${id} `,
      });
      console.log(errors);
      result(null, errors);
    }
  );
};

Favourite.remove = (favourite, result) => {
//   var favouriteUpdate = {};
//   if (favourite.user_id != null) {
//     favouriteUpdate.user_id = favourite.user_id;
//   }
//   if (favourite.teacher_id != null) {
//     favouriteUpdate.teacher_id = favourite.teacher_id;
//   }
console.log("id"+favourite);
  sql.query("DELETE FROM favourite_teacher WHERE id=?", [favourite], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted trial with ");
    result(null, res);
  });
};

module.exports = Favourite;

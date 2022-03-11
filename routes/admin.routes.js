module.exports=app=>{
    const admin=require("../controllers/admin.controller.js");
   app.get('/admin',admin.index);
   app.get('/admin/login',admin.login);
   app.post('/admin/login',admin.postlogin);
   app.get('/admin/teacher',admin.teacher);
   app.get('/user/status/:id',admin.UserstatusChange);
   app.get('/admin/student',admin.student);
   app.post('/admin/teacheredit',admin.editteacher);
   app.post('/admin/teacherdelete',admin.deleteteacher);
   app.post('/admin/deletecourse',admin.deletecourse);
   app.post('/admin/courseedit',admin.editcourse);
   app.get('/admin/course',admin.course);
   app.post('/admin/createcourse',admin.create);

}
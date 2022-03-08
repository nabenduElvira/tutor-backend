const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const fileUpload = require("express-fileupload");
require('./config/cron.config.js');
const session = require('express-session');
const path = require("path");
const app=express();

const corsOptions ={
   origin:'*', 
   credentials:true,         
   optionSuccessStatus:200,
}

app.set("views", __dirname + "/");
app.set("vew engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(
  "/admin-property",
  express.static(path.join(__dirname, "admin/public"))
);
// app.use(cors(corsOptions));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

app.use(cors(corsOptions))
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

require("./routes/user.routes.js")(app);
require("./routes/teacher.routes.js")(app);
require("./routes/student.routes.js")(app);
require("./routes/lesson.routes.js")(app);
require("./routes/trial.routes.js")(app);
require("./routes/language.routes.js")(app);
require("./routes/subject.routes.js")(app);
require("./routes/teaches.routes.js")(app);
require("./routes/accent.routes.js")(app);
require("./routes/chat.routes.js")(app);
require("./routes/favourite.routes.js")(app);
require("./routes/education.routes.js")(app);
require("./routes/experience.routes.js")(app);
require("./routes/certification.routes.js")(app);
require("./routes/schedule.routes.js")(app);
require("./routes/schedule_booking.routes.js")(app);
require("./routes/notification.routes.js")(app);
require("./routes/requestteacher.routes.js")(app);
require("./routes/jobrequest.routes.js")(app);
require("./routes/privatelessons.routes.js")(app);
require("./routes/admin.routes.js")(app);

app.listen(7200,()=>{
    console.log("Server is running on port 7200");
})
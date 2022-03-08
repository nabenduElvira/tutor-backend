var cron = require('node-cron');
const Schedule=require("../models/schedule.model.js");
const Notification=require("../models/notification.model.js");
// var moment = require('moment');
var moment = require("moment-timezone");

cron.schedule('* * * * *', () => {
   Schedule.getAllAutomatic((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Lessons."
          });
        else{
            // console.log(data);
            //console.log("data");
            let timezone = "Asia/Calcutta";
                moment.tz.setDefault(timezone);
                
            for(var i in data){
                //console.log(data[i].start);
                var now = new Date();
                // var olderDate = moment(data[i].start).tz(timezone).subtract(2, 'minutes').format("YYYY-MM-DD h:mm:ss a");
               var olderDate = data[i].start;
                var current_date=moment.tz(timezone).format("YYYY-MM-DD h:mm:ss a");
               
                

                // console.log("older");
                //console.log("olderDate",olderDate);
                // console.log("new");
                //console.log("current_date",current_date);
                if(current_date==olderDate){
                    console.log("matched");
                    var link=`${data[i].linkid}`;
                    const notification = new Notification({
                    user_id: data[i].student_id,
                    msg: "your joining link is ~"+link,
            
            
                   
                  });
                
                  // Save Customer in the database
                  Notification.create(notification, (err, data1) => {
                    if (err)
                      res.status(500).send({
                        message:
                          err.message || "Some error occurred while creating the Accent."
                      });
                    //else res.send(data);
                    console.log(data);
                     var notification1 = new Notification({
                    user_id: data[i].teacher_id,
                    
                    msg: "your joining link is ~"+link,
            
            
                   
                  });
                  console.log("notification");
                  console.log(notification1);
                
                  // Save Customer in the database
                  Notification.create(notification1, (err, data) => {
                    if (err)
                      res.status(500).send({
                        message:
                          err.message || "Some error occurred while creating the Accent."
                      });
                    //else res.send(data);
                  });
                  });
                  
                }
            }
        }
      });
});
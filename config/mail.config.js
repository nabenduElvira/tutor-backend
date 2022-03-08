const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "smtp.gmail.com",
  host: "mail.elvirainfotech.org",
  port: 465,
  secure: true,
  auth: {
    user: "kawtek@elvirainfotech.org",
    pass: "g$n&-THd;(o@",
  },
});
module.exports.transporter=transporter;


// const transporter = nodemailer.createTransport({
//   host: config.get('smtp.host'),
//   port: config.get('smtp.port'),
//   auth: {
//     user: config.get('smtp.username'),
//     pass: config.get('smtp.password')
//   }
// });
// // send email
// await transporter.sendMail({
//   from: config.get('smtp.from'),
//   to: To,
//   subject: Subject,
//   html: Body
// });
// res.status(200).send(JSON.stringify({ 'status': 2, 'error': null, 'result': 'Mail Send to your email address for changing password!' }));

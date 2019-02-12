var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/feedback', function(req, res, next) {
  res.render('feedback', { title: 'Express' });
});

router.get('/heroes', function(req, res, next) {
  res.render('heroes', { title: 'Express' });
});

router.get('/learn', function(req, res, next) {
  res.render('learn', { title: 'Express' });
});

router.post('/feedback', (req, res) => {
  const output = `
    <p>You have a  New Enquiry</p>
    <h3>Enquiry Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Phone: ${req.body.phone}</li>
      <li>Email: ${req.body.email}</li>  
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'chikoo1998@gmail.com', // generated ethereal user
        pass: 'abhijeetgautam19998'  // generated ethereal password
    },
    // tls:{
    //   rejectUnauthorized:false
    // }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'chikoo1998@gmail.com', // sender address
      to: 'chikoo1998@gmail.com', // list of receivers
      subject: 'New Enquiry', // Subject line
      text: 'From Brandzia Website', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.send(`<body style="background-color:black; 
        overflow:hidden;">
        <div style="position:absolute; 
        font-family: 'Montserrat';
        width : 100%; 
         height: 5rem; 
         text-align: center;
          font-size: 2rem;
          top: 50%;
          color:silver;
          transform: translateY(-50%);
          ">
          Thank You For The Feedback. We will get in touch with you soon </div></body>`); 
  });
});

module.exports = router;

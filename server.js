const express = require("express");
const bodyParser = require("body-parser"); 
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require('path');
const app = express();

// what view engine are we using
app.engine('handlebars', exphbs());
// set view engine
app.set('view engine', 'handlebars');

// bparser middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

//  static folder utilized
app.use('/public', express.static(path.join(__dirname, 'public')));


// route definition
app.get('/contact', (req, res) => {
    res.render('contact', {layout: false});
});

// route definition
app.get('/', (req, res) => {
    res.render('home', {layout: false});
});

// route definition
app.get('/customer-survey', (req, res) => {
    res.render('customersurvey', {layout: false});
});

app.get('/thank-you', (req,res) => {
    res.render('thankyou', {layout: false});
})

// port declaration - 5000 for heroku 
const PORT = process.env.PORT || 5000;

// POST: api setup for contact form submission
// POST: template literal req.body declaration for email config
// POST: nodemailer middleware setup
app.post('/send', (req, res) => {
    console.log(req.body);
    const output = 
    `<p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Email: ${req.body.phone}</li>
        <li>Preferred Contact Method: ${req.body.preferred}</li>
        <li>Property Type: ${req.body.property}</li>
        <li>Service Requested: ${req.body.services}</li>
        <li>Message: ${req.body.message}</li>
    </ul>`

     console.log(output);

      // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'usethisemailtosendemails@gmail.com', // example user
        pass: 'Emailandstuff12'  // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
      }
    
  });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Nodemailer Contact" <usethisemailtosendemails@gmail.com>', // sender address
      to: 'mmeganshaw@gmail.com', // list of receivers
      subject: 'Website Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

    // send mail with object, log error, else print confirm and redirect to thank you page
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.render('thankyou', {layout: false});
    }

  });

})

app.post('/send-survey', (req, res) => {
    console.log(req.body);
    const survey = 
    `<p>You have a new custom survey fill</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Service Provided: ${req.body.service}</li>
        <li>Overall Rating: ${req.body.rating}</li>
        <li>Were sevices povided in a timely manner: ${req.body.timely}</li>
        <li>Communication Rating: ${req.body.communication}</li>
        <li>Recommend Excel to a Friend?: ${req.body.recommend}</li>
        <li>Additional Comment: ${req.body.message}</li>
    </ul>`

    console.log(survey);
     // create reusable transporter object using the default SMTP transport
     let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'usethisemailtosendemails@gmail.com', // example user
            pass: 'Emailandstuff12'  // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
          }
        
      });
    
        // setup email data with unicode symbols
        let mailOptions = {
          from: '"Nodemailer Contact" <usethisemailtosendemails@gmail.com>', // sender address
          to: 'mmeganshaw@gmail.com', // list of receivers
          subject: 'Website Contact Request', // Subject line
          text: 'Hello world?', // plain text body
          html: survey // html body
      };
    
        // send mail with object, log error, else print confirm and redirect to thank you page
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.render('thankyou', {layout: false});
        }
    
      });

})

app.listen(PORT, function(){ 
    console.log("listening on port " + PORT);
})
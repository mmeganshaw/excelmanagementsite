const express = require("express");
const bodyParser = require("body-parser"); 
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require('path');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const app = express();

// what view engine are we using
app.engine('handlebars', exphbs());
// set view engine
app.set('view engine', 'handlebars');

// bparser middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

const myOAuth2Client = new OAuth2(
    "207558275265-gpkbiq9sf0ps5g3jofo49j8o7f7ot15g.apps.googleusercontent.com",
    "_xS__JN1ua5yMiu32KQoRPwj",
    "https://developers.google.com/oauthplayground"
)

myOAuth2Client.setCredentials({
    refresh_token:"1//04MwrCq7AkavyCgYIARAAGAQSNwF-L9IrYR3jGeqihZwL4fxHSj1Lmc9l7bTKYrgY9s_b5PZwZaTRtHAYJyL-gBMLdfN4374hHnk"
    });

const myAccessToken = myOAuth2Client.getAccessToken()

//  static folder utilized
app.use('/public', express.static(path.join(__dirname, 'public')));


// route definition
app.get('/contact', (req, res) => {
    res.render('contact', {layout: false});
});

// route definition
app.get('/careers', (req, res) => {
    res.render('careers', {layout: false});
});

// route definition
app.get('/about', (req, res) => {
    res.render('about', {layout: false});
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

// services pages

app.get('/construction', (req,res) => {
    res.render('construction', {layout: false});
})

app.get('/landscaping-installation', (req,res) => {
    res.render('landscape-install', {layout: false});
})

app.get('/landscaping', (req,res) => {
    res.render('landscape-maint', {layout: false});
})

app.get('/snow-ice-management', (req,res) => {
    res.render('snow', {layout: false});
})

app.get('/outdoor-living', (req,res) => {
    res.render('outdoor-living', {layout: false});
})

app.get('/roofing-siding', (req,res) => {
    res.render('roofing', {layout: false});
})

app.get('/decks-fences', (req,res) => {
    res.render('decks', {layout: false});
})

app.get('/kitchen-bath', (req,res) => {
    res.render('kitchens', {layout: false});
})

app.get('/irrigation', (req,res) => {
    res.render('irrigation', {layout: false});
})

app.get('/concrete', (req,res) => {
    res.render('concrete', {layout: false});
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

        let transporter = nodemailer.createTransport({
        service: 'gmail',
            auth: {
                type: "OAuth2",
                user: "usethisemailtosendemails@gmail.com", //your gmail account you used to set the project up in google cloud console"
                clientId: "207558275265-gpkbiq9sf0ps5g3jofo49j8o7f7ot15g.apps.googleusercontent.com",
                clientSecret: "_xS__JN1ua5yMiu32KQoRPwj",
                refreshToken: "1//04MwrCq7AkavyCgYIARAAGAQSNwF-L9IrYR3jGeqihZwL4fxHSj1Lmc9l7bTKYrgY9s_b5PZwZaTRtHAYJyL-gBMLdfN4374hHnk",
                accessToken: myAccessToken //access token variable we defined earlier
        },
        tls:{
            rejectUnauthorized:false
        }
        
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Contact Request" <usethisemailtosendemails@gmail.com>', // sender address
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
      res.send({message:'Email has been sent: check your inbox!'})
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
          from: '"Survey Response" <usethisemailtosendemails@gmail.com>', // sender address
          to: 'anthonyz@excelmanagementllc.com', // list of receivers
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
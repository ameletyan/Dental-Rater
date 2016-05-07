var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://artm95%40gmail.com:armenian@smtp.gmail.com');
var htmlToText = require('html-to-text');
var fs = require('fs');


app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/static/index.html'));
});

// POST method route
app.post('/mail', function (req, res) {
  res.send('POST request to the homepage');
	var contents = fs.readFileSync(path.join(__dirname+'/static/mail.html')).toString();

  var mailOptions = {
	    from: '"Artur Meletyan" <artm95@gmail.com>', // sender address
	    to: req.body.patient_email, // list of receivers
	    subject: 'Hello', // Subject line
	    html: contents
	};
  transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
});

app.post('/feedback_1', function (req, res) {
 //  res.send('POST request to the homepage');
	// var contents = fs.readFileSync(path.join(__dirname+'/static/mail.html')).toString();

 //  var mailOptions = {
	//     from: '"Artur Meletyan" <artm95@gmail.com>', // sender address
	//     to: req.body.patient_email, // list of receivers
	//     subject: 'Hello', // Subject line
	//     html: contents
	// };
 //  transporter.sendMail(mailOptions, function(error, info){
	//     if(error){
	//         return console.log(error);
	//     }
	//     console.log('Message sent: ' + info.response);
	// });
	console.log(req.body);
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
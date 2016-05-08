var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var gmailPassword = process.env.GMAIL_PASSWORD;
var transporter = nodemailer.createTransport('smtps://artm95%40gmail.com:' + gmailPassword + '@smtp.gmail.com');
var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : process.env.MYSQL_PASSWORD || 'password',
  database : 'dental_ratings'
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/static/index.html'));
});

app.get('/improvement_feedback', function (req, res) {
	res.sendFile(path.join(__dirname+'/static/improvement_feedback.html'))
});

app.get('/review_request', function (req, res) {
	res.sendFile(path.join(__dirname+'/static/review_request.html'))
});

app.get('/five_star_feedback', function (req, res) {
	res.sendFile(path.join(__dirname+'/static/five_star_feedback.html'))
});

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
	var rating = parseInt(req.body.rating);
	if(rating <= 4) {
		res.redirect('/improvement_feedback');
	}
	else {
		res.redirect('/review_request');
	}
});

app.post('/improvement_feedback', function (req, res) {
	var sql = 'INSERT INTO anonymous_feedback VALUES ( ' + connection.escape(req.body.commentText) + ' );';
	connection.query(sql, function(err, rows) {
	  if(err) {
	  	res.send('Something went wrong and we could not submit data to the database.');
	  }
	  else {
	  	res.send('Thank you for your feedback!');
	  }
	});
});

app.post('/five_star_feedback', function (req, res) {
	var sql = 'INSERT INTO five_star_feedback VALUES ( ' + connection.escape(req.body.name) + ', ' + connection.escape(req.body.commentText) + ', ' + connection.escape(req.body.rating) + ', now() );';
	connection.query(sql, function(err, rows) {
	  if(err) {
	  	res.send('Something went wrong and we could not submit data to the database.');
	  }
	  else {
	  	res.send('Thank you for your feedback!');
	  }
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
/*
		Artur Meletyan
		5/7/2016

		Dental-Rater:
		A simple app that processes ratings sent over email
*/

/* Define all necessary variables */
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var gmailPassword = process.env.GMAIL_PASSWORD;
var transporter = nodemailer.createTransport('smtps://dental.rater%40gmail.com:' + gmailPassword + '@smtp.gmail.com');
var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : process.env.MYSQL_PASSWORD || 'password',
  database : 'dental_ratings'
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use( bodyParser.urlencoded ({     // to support URL-encoded bodies
  extended: true
}));

/* GET statements */
app.get( '/', function (req, res) {
  res.sendFile(path.join(__dirname+'/static/index.html'));
});

app.get( '/improvement_feedback', function (req, res) {
	res.sendFile(path.join(__dirname+'/static/improvement_feedback.html'))
});

app.get( '/review_request', function (req, res) {
	res.sendFile(path.join(__dirname+'/static/review_request.html'))
});

app.get( '/five_star_feedback', function (req, res) {
	res.sendFile(path.join(__dirname+'/static/five_star_feedback.html'))
});

/* POST statements */
app.post( '/mail', function (req, res) {
  res.send('An email has been sent to the designated address.');
	var contents = fs.readFileSync(path.join(__dirname+'/static/mail.html')).toString();

  var mailOptions = {
	    from: '"Dental Rater" <dental.rater@gmail.com>',
	    to: req.body.patient_email,
	    subject: 'Great Dental Websites Rating Request',
	    html: contents
	};
  transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
});

app.post('/feedback', function (req, res) {
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
  		console.log('Anonymous feedback failed to store.');
	  }
	  else {
	  	res.send('Thank you for your feedback!');
  		console.log('Anonymous feedback stored successfully.');
	  }
	});
});

app.post('/five_star_feedback', function (req, res) {
	var sql = 'INSERT INTO five_star_feedback VALUES ( ' + connection.escape(req.body.name) + ', ' + connection.escape(req.body.commentText) + ', ' + connection.escape(req.body.rating) + ', now() );';
	connection.query(sql, function(err, rows) {
	  if(err) {
	  	res.send('Something went wrong and we could not submit data to the database.');
  		console.log('Feedback failed to store.');
	  }
	  else {
	  	res.send('Thank you for your feedback!');
  		console.log('Feedback stored successfully.');
	  }
	});
});

/* Listening */
app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
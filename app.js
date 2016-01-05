var express = require('express');
var app = express();
var twilio = require('twilio');

var TWILIO_ACCOUNT_SID = 'ACc25efa3b90f3685b8f914ca573fd97e5';
var TWILIO_AUTH_TOKEN = 'd11a4d5ebeaea4e78d65940052db5f37';
var TWILIO_NUMBER = '+13154017343';

var client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.get('/communicate', function(req, res){
	var resp = new twilio.TwimlResponse();

	console.log(req);
	console.log('From: ' + req.from);
	console.log('Body: ' + req.body);

	resp.message(req.from + ' sent ' + req.body);
	resp.message({to: '+13153825338'}, 'kunal, message received alert');
	res.writeHead(200, {
		'Content-Type': 'text/xml'
	});
	res.end(resp.toString());
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
var express = require('express');
var app = express();
var twilio = require('twilio');
var bodyParser = require('body-parser');

var TWILIO_ACCOUNT_SID = 'ACc25efa3b90f3685b8f914ca573fd97e5';
var TWILIO_AUTH_TOKEN = 'd11a4d5ebeaea4e78d65940052db5f37';
var TWILIO_NUMBER = '+13154017343';

var client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

var COUNT_KILLED = 1;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
})); 


app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.post('/reply', function(req, res){
	var resp_twiml = new twilio.TwimlResponse();
	var response = '';

	var sender = req.body.From;
	var message = req.body.Body.toLowerCase();

	if(message.indexOf('kill') > -1) {
		response = 'Yay! Your next target is ' + COUNT_KILLED;
		COUNT_KILLED += 1;
	} else if(message.indexOf('status') > -1) {
		response = 'The current # killed is ' + COUNT_KILLED;
	} else {

	}

	console.log(req.body);
	console.log('From: ' + req.body.From);
	console.log('Body: ' + req.body.Body);

	resp_twiml.message(message);
	resp_twiml.message({to: '+13153825338'}, 'Message received alert: ' + message);
	res.writeHead(200, {
		'Content-Type': 'text/xml'
	});
	res.end(resp.toString());
});

var server = app.listen(app.get('port'), function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App is running on port', app.get('port'));
});
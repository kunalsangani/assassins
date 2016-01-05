var express = require('express');
var app = express();
var twilio = require('twilio');

var TWILIO_ACCOUNT_SID = 'ACc25efa3b90f3685b8f914ca573fd97e5';
var TWILIO_AUTH_TOKEN = 'd11a4d5ebeaea4e78d65940052db5f37';
var TWILIO_NUMBER = '+13154017343';

var client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.post('/reply', function(req, res){
	var resp = new twilio.TwimlResponse();

	console.log(req.params);
	console.log('From: ' + req.params.from);
	console.log('Body: ' + req.params.body);

	resp.message(req.params.from + ' sent ' + req.params.body);
	resp.message({to: '+13153825338'}, 'kunal, message received alert');
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
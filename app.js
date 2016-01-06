var express = require('express');
var app = express();
var twilio = require('twilio');
var bodyParser = require('body-parser');
var roster = require('./roster')

var TWILIO_ACCOUNT_SID = 'ACc25efa3b90f3685b8f914ca573fd97e5';
var TWILIO_AUTH_TOKEN = 'd11a4d5ebeaea4e78d65940052db5f37';
var TWILIO_NUMBER = '+13154017343';
var ADMIN_NUMBER = '+13153825338';

var client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
})); 


app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.post('/kill_player', function(req, res) {
	var success = roster.killPlayer(req.body.player_ind)
	res.end(success);
});

app.get('/get_full_roster', function(req, res) {
	var alive_text = '';
	var killed_text = '';
	for(var i = 0; i < roster.players.length; i++) {
		var player = roster.players[i];
		var descr = '<b>' + i + ': ' + player.first_name + ' ' + player.last_name + '</b><br>';
		descr += player.phone + '<br>' + player.target + '<br><br>';
		if(roster.players[i].alive) {
			alive_text += descr;
		} else {
			killed_text += descr;
		}
	}
	res.end(alive_text + '--------------<br><br>' + killed_text);
	// res.writeHead(200, {
	// 	'Content-Type': 'application/json'
	// });
	// res.json({roster : roster.getFullRoster()});
});

app.post('/reply', function(req, res){
	var resp_twiml = new twilio.TwimlResponse();

	var sender_number = req.body.From;
	var message = req.body.Body.toLowerCase();
	var sender = roster.lookupPlayerByPhone(sender_number);

	if(sender == undefined) {
		resp_twiml.message('Sorry, your number is not in the system. Please contact Kunal at 315-382-5338 with any questions.');
	} else if(!sender.alive) {
		resp_twiml.message('Sorry, you\'re registered as dead in the game. Please contact Kunal at 315-382-5338 with any questions.');
	} else {
		if(message.indexOf('kill') > -1) {
			var target = roster.lookupPlayerByIndex(sender.target);
			var response = 'You\'ve assassinated ' + target.first_name + '!\n';
			var success = roster.killPlayer(sender.target);
			target = roster.lookupPlayerByIndex(sender.target);
			response += 'Your next target is ' + target.first_name + ' ' + target.last_name + '. ';
			response += 'There are ' + roster.numPlayersLeft() + ' people left in the game.'
			resp_twiml.message(response);
			if(success == 1) resp_twiml.message('Congrats! You won ASSASSINS!');
		} else if(message.indexOf('status') > -1) {
			var target = roster.lookupPlayerByIndex(sender.target);
			var response = 'Your target is ' + target.first_name + ' ' + target.last_name + '. ';
			response += 'There are ' + roster.numPlayersLeft() + ' people left in the game.'
			resp_twiml.message(response);
		} else {
			resp_twiml.message('Text KILL to register that you\'ve assassinated your target, or text STATUS to learn about the current state of the game.');
		}
	}

	var alert = 'Message received from ' + sender_number;
	if(sender != undefined) alert += ' (' + sender.first_name + ' ' + sender.last_name + ')';
	alert += ': ' + message;

	resp_twiml.message({to: ADMIN_NUMBER}, alert);
	res.writeHead(200, {
		'Content-Type': 'text/xml'
	});
	res.end(resp_twiml.toString());
});

var server = app.listen(app.get('port'), function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App is running on port', app.get('port'));
});
// Load the twilio module
var TWILIO_ACCOUNT_SID = 'ACc25efa3b90f3685b8f914ca573fd97e5';
var TWILIO_AUTH_TOKEN = 'd11a4d5ebeaea4e78d65940052db5f37';
var TWILIO_NUMBER = '+13154017343';

var twilio = require('twilio');
 
// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
 
// Pass in parameters to the REST API using an object literal notation. The
// REST client will handle authentication and response serialzation for you.
client.sms.messages.create({
	to:'+13153825338',
	from: TWILIO_NUMBER,
	body:'ahoy hoy! Testing Twilio and node.js'
}, function(error, message) {
	if (!error) {
		console.log('Success! The SID for this SMS message is:');
		console.log(message.sid);
		console.log('Message sent on:');
		console.log(message.dateCreated);
	} else {
		console.log('Oops! There was an error.');
	}
});
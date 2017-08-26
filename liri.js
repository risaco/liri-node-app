// imports the file needed to access the keys
var accessKeys = require("./keys.js");

// stores the needed information
var keys = accessKeys.twitterKeys;

// ******* GET PACKAGES *******
var Twitter = require('twitter'); // imports the twitter package

var Spotify = require('node-spotify-api'); // imports the spotify package



// assigns variables to user inputs
var action = process.argv[2];

var something = process.argv[3];

// action commands
switch (action) {
	case 'my-tweets':
	break;

	case 'spotify-this-song':
	break;

	case 'movie-this':
	break;

	case 'do-what-it-says':
	break;

	case default:
	console.log("Invalid command. Try again.");
}
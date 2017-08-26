// imports the file needed to access the keys
var accessKeys = require("./keys.js");

// stores the needed information
var twitterKeys = accessKeys.twitterKeys;
var spotifyKeys = accessKeys.spotifyKeys;
var omdbKey = accessKeys.ombdKey;

// ******* GET PACKAGES *******
var Twitter = require('twitter'); // imports the twitter package

var Spotify = require('node-spotify-api'); // imports the spotify package

var request = require('request'); // this file is used to make request to OMDB api

var fs = require('fs');

// assigns variables to user inputs
var action = process.argv[2];

var something = process.argv[3];

// action commands
switch (action) {

	// display last 20 tweets and when they were created
	case 'my-tweets':
	break;

	// takes the song provided and displays artist(s), song name, preview link of song, album of song
	// if no song is provided, use "the sign" by Ace of Bass
	case 'spotify-this-song':
	break;

	// takes movie title and displays movie title, year it came out, imdb rating, rotten tomatoes rating,
	// country where produced, language of the movie, plot, actors
	// if no movie is entered, default to "Mr. Nobody"
	case 'movie-this':
	break;

	// uses fs command to read 'random.txt' and execute one of LIRI's commands
	case 'do-what-it-says':
	fs.readFile("random.txt", "utf8", function(error, data) {

		// create array to split text string and hold values
		var dataArray = data.split(',');

		// assign data in array to appropriate variables
		action = dataArray[0];
		something = dataArray[1];
	}
	break;

	case default:
	console.log("Invalid command. Try again.");
}

// ******* FUNCTIONS *******

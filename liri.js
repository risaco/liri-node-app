// imports the file needed to access the keys
var accessKeys = require("./keys.js");

// stores the needed information
var twitterKeys = accessKeys.twitterKeys;

var omdbKey = accessKeys.ombdKey;

// ******* GET PACKAGES *******
var Twitter = require('twitter'); // imports the twitter package

var Spotify = require('node-spotify-api'); // imports the spotify package

var spotify = new Spotify({
  id: 'fc59b166c76a4759a26a13ce7483b2ff',
  secret: '98e748b8cb744facbc4c1ef2fb00f115',
});

var request = require('request'); // this file is used to make request to OMDB api

var fs = require('fs');

// assigns variables to user inputs
var action = process.argv[2];

var searchTitle = "";

var nodeArgs = process.argv;

// action commands
switch (action) {

	// display last 20 tweets and when they were created
	case 'my-tweets':
	break;

	// takes the song provided and displays artist(s), song name, preview link of song, album of song
	// if no song is provided, use "the sign" by Ace of Bass
	case 'spotify-this-song':

	// capture all of the arguments after "spotify-this-song" and put them together
	for (var i = 3; i < nodeArgs.length; i++) {

	  if (i > 3 && i < nodeArgs.length) {

	    searchTitle = searchTitle + "+" + nodeArgs[i];

	  }

	  else {

	    searchTitle += nodeArgs[i];

	  }
	}

	spotify.search({ type: 'track', query: searchTitle, limit:1 })
	  .then(function(response) {
	  	var artists = response.tracks.items[0].artists[0].name;
	  	var song = response.tracks.items[0].name;
	  	var album = response.tracks.items[0].album.name;
	  	var preview = response.tracks.items[0].external_urls.spotify;

	  	console.log("Artist(s): " + artists + "\nSong Title: " + song + "\nAlbum: " + album + "\nListen: " + preview );
	  	
	    
	  })
	  .catch(function(err) {
	    console.log(err);
	  });

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
	})
	break;

	
	// console.log("Invalid command. Try again.");
}

// ******* FUNCTIONS *******

// function spotifyThis(title){

// 	spotify.search({ type: 'track', query: title }, function(err, data) {
// 	  if (err) {
// 	    return console.log('Error occurred: ' + err);
// 	  }
	 
// 		console.log(data); 
// 	});
// }

	
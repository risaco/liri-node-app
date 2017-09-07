// LIRI accepts the following commands: my-tweets; spotify-this-song; movie-this; do-what-it-says

// imports the file needed to access the keys
var accessKeys = require("./keys.js");

// stores the needed information
var twitterKeys = accessKeys.twitterKeys;

var omdbKey = accessKeys.omdbKey.api_key;


// ******* GET PACKAGES *******
var Twitter = require('twitter'); // imports the twitter package

var twitter = new Twitter(twitterKeys);

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

var queryUrl = "";

var nodeArgs = process.argv;

// action commands
switch (action) {

	// display last 20 tweets and when they were created
	case 'my-tweets':
	var params = { screen_name: 'BrunoMars', count: 20 };

	twitter.get('statuses/user_timeline', params, function(error, tweets, response) {

	    if (!error) {
	      var data = []; //empty array to hold data
	      for (var i = 0; i < tweets.length; i++) {
	        data.push({
	            Created: tweets[i].created_at,
	            Tweets: tweets[i].text,
	        });
	      }
	      console.log(data);
	      // writeToLog(data);
	    }
	});
	

	break;

	// takes the song provided and displays artist(s), song name, preview link of song, album of song
	// if no song is provided, use "the sign" by Ace of Bass
	case 'spotify-this-song':

	// capture all of the arguments after "spotify-this-song" and put them together
	if (nodeArgs.length>3){

		createSearch();
		
	}

	else { searchTitle = "the sign ace of"; }

	spotify.search({ type: 'track', query: searchTitle, limit:1 })
	  .then(function(response) {
	  	var artists = response.tracks.items[0].artists[0].name;
	  	var song = response.tracks.items[0].name;
	  	var album = response.tracks.items[0].album.name;
	  	var preview = response.tracks.items[0].external_urls.spotify;

	  	console.log("\nArtist(s): " + artists + "\nSong Title: " + song + "\nAlbum: " + album + "\nListen: " + preview );
	    
	  })
	  .catch(function(err) {
	    console.log(err);
	});

	break;

	// takes movie title and displays movie title, year it came out, imdb rating, rotten tomatoes rating,
	// country where produced, language of the movie, plot, actors
	// if no movie is entered, default to "Mr. Nobody"
	case 'movie-this':

	if (nodeArgs.length>3){

		createSearch();
		
	}

	else { searchTitle = "Mr Nobody"; }


	queryUrl = "http://www.omdbapi.com/?t=" + searchTitle + "&y=&plot=short&apikey=" + omdbKey;


	request(queryUrl, function(error, response, body) {

  		// If the request is successful
  		if (!error && response.statusCode === 200) {

  			// console.log(response);

  			var movieTitle = JSON.parse(body).Title;
  			var releaseYear = JSON.parse(body).Year;
  			var imdbRating = JSON.parse(body).Ratings[0].Value;
  			var rottenRating = JSON.parse(body).Ratings[1].Value;
  			var country = JSON.parse(body).Country;
  			var language = JSON.parse(body).Language;
  			var plot = JSON.parse(body).Plot;
  			var actors = JSON.parse(body).Actors;

    		// Parse the body of the site and recover just the imdbRating
    		// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    		console.log("\nTitle: " + movieTitle + "\nRelease Year: " + releaseYear + "\nIMDB Rating: " + imdbRating + "\nRotten Tomatoes: " + rottenRating 
    			+ "\nProduction Country: " + country + "\nLanguage: " + language + "\nPlot: " + plot + "\nActors: " + actors);
  		}
  	});

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

	default:
	console.log("\nInvalid command. Try again.");
	break;
}

// ***** FUNCTIONS *****

function createSearch() {
	for (var i = 3; i < nodeArgs.length; i++) {

		  if (i > 3 && i < nodeArgs.length) {
		    searchTitle = searchTitle + "+" + nodeArgs[i];
		  }

		  else { searchTitle += nodeArgs[i]; }
		}
}
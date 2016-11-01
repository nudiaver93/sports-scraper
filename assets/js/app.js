// Express Initialized
var express = require('express');
var app = express();

// Call other modules for HTTP request and data
var request = require('request');
var cheerio = require('cheerio');

app.get('/nba', function(req, res){

	request('http://www.nba.com/news', function(error, response, html){


	var $ = cheerio.load(html);

	var results = [];

		$('section.tile').each(function(i, element){


			var title = $(element).text();
			var link = $(element).find('a').attr('href');

			// gather all of the articles and headlines
			results.push({nbaTitle: title, nbaLink: 'http://www.nba.com' + link});

		});

	res.json(results);

	});

});

app.get('/nhl', function(req, res){

	request('https://www.nhl.com/', function (error, response, html) {

	  var $ = cheerio.load(html);

	  var result = [];

	  $('h4.headline-link').each(function(i, element){

	      var title = $(this).text();

	      var link = $(element).parent().attr('href');
	      
	      result.push({
	        title:title,
	        link:link
	      });
	    });

	  res.json(result);

	});
});

app.listen(8000, function() {
  console.log('App running on port 8000!');
});

/*request('http://www.nba.com/news', function(error, response, html){

	console.log('These are the top stories on the NBA website');

	var $ = cheerio.load(html);


	$('section.tile').each(function(i, element){

		//var title = $(element).children().attr('title');

		var title = $(element).text();

		results.push(title);

	});

});*/
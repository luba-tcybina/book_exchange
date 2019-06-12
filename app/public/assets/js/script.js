$("#add-btn").on('click', function() {
	
	var isbn = document.getElementById('isbn');
	
	var https = require('https');
	var path = '/books/v1/volumes?q=isbn:' + isbn + '&key=AIzaSyDB0TwWP5ouoFr37dmNo1r9HCRWzg3czsk';

	var options = {
		host: 'www.googleapis.com',
		path: path,
	};

	var str = '';
	var objectJSON;

	//Initiating the request that gets ISBN data
	https
		.request(options, function(res) {
			res.on('data', function(chunk) {
				str += chunk;
			});
			res.on('end', function() {
				objectJSON = JSON.parse(str);
				//prints the book object
				console.log(objectJSON.items[0]);
			});
		})
		.end();
});

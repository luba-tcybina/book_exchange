//$("#add-btn").on('click', function() {
	
	var isbn = "1119056071" // document.getElementById('isbn');
	
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
				var resISBN = isbn;
					console.log(resISBN);
				var resTitle = objectJSON.items[0].volumeInfo.title;
					console.log(resTitle);
				var resAuthor = objectJSON.items[0].volumeInfo.authors[0];
					console.log(resAuthor);
				var resGenre = objectJSON.items[0].volumeInfo.categories[0];
					console.log(resGenre);
				var resDescription = objectJSON.items[0].volumeInfo.description;
					console.log(resDescription);
				var resImage = "https://books.google.com/books/content?id=" + objectJSON.items[0].id + "&printsec=frontcover&img=1&zoom=2&edge=nocurl&source=gbs_api";
				console.log(resImage);
			});
			
		})

.end();


//});
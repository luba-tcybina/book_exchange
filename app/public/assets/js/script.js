$(document).ready(function() {
	$('#add-btn').on('click', function(event) {
		event.preventDefault();
		var key = 'AIzaSyDB0TwWP5ouoFr37dmNo1r9HCRWzg3czsk';

		var title = $('#title')
			.val()
			.trim();
		var author = $('#author')
			.val()
			.trim();
		var isbn = $('#isbn')
			.val()
			.trim();
		console.log('title: ' + title + '\nauthor: ' + author + '\nISBN: ' + isbn);

		if (isbn) {
			var path = '/books/v1/volumes?q=isbn:' + isbn + '&key=' + key;
		} else {
			if (!title) {
				var path = '/books/v1/volumes?q=inauthor:' + author + '&key=' + key;
			} else if (!author) {
				var path = '/books/v1/volumes?q=intitle:' + title + '&key=' + key;
			} else {
				var path = '/books/v1/volumes?q=intitle:' + title + '+inauthor:' + author + '&key=' + key;
			}
		}

		console.log(path);

		var https = require('https');
		var options = {
			host: 'www.googleapis.com',
			path: path,
		};

		var str = '';
		var objectJSON;

		//Initiating the request that gets book data
		https
			.request(options, function(res) {
				res.on('data', function(chunk) {
					str += chunk;
				});
				res.on('end', function() {
					objectJSON = JSON.parse(str);
					//prints the title of the book
					console.log(objectJSON.items[0]);
				});
			})
			.end();

		//prints the book object
		/*
		var resISBN = isbn;
		console.log(resISBN + '\n');

		var resTitle = objectJSON.items[0].volumeInfo.title;
		console.log(resTitle + '\n');

		var resAuthor = objectJSON.items[0].volumeInfo.authors[0];
		console.log(resAuthor + '\n');

		var resGenre = objectJSON.items[0].volumeInfo.categories[0];
		console.log(resGenre + '\n');

		var resDescription = objectJSON.items[0].volumeInfo.description;
		console.log(resDescription + '\n');

		var date = new Date(objectJSON.items[0].volumeInfo.publishedDate);
		var resYear = date.getFullYear();
		console.log(resYear + '\n');

		var resPages = objectJSON.items[0].volumeInfo.pageCount;
		console.log(resPages + '\n');

		var resImage =
			'https://books.google.com/books/content?id=' +
			objectJSON[0].items[0].id +
			'&printsec=frontcover&img=1&zoom=2&edge=nocurl&source=gbs_api';
		console.log(resImage + '\n');
		*/
	});
});

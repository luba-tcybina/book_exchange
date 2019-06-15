$("#add-btn").on("click", function(event) {
	event.preventDefault();

	var newBook = {
		title = $("#title").val().trim(),
	 	author = $("#author").val().trim(),
	 	genre = $("#genre").val().trim(),
	 	description = $("#description").val().trim(),
	 	isbn = $("#ibsn").val().trim()
	};
	
	var https = require('https');
	var path = '/books/v1/volumes?q=isbn:' + newBook.isbn + '&key=AIzaSyDB0TwWP5ouoFr37dmNo1r9HCRWzg3czsk';

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
			});
		})

.end();

return objectJSON;
});


//prints the book object
console.log(objectJSON[0].items[0] + '================\n');

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

var resImage = "https://books.google.com/books/content?id=" + objectJSON[0].items[0].id + "&printsec=frontcover&img=1&zoom=2&edge=nocurl&source=gbs_api";
	console.log(resImage + '\n');
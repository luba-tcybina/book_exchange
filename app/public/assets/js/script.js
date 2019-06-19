$(document).ready(function () {

	$('#add-btn').on('click', function (event) {
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
			.trim()
			.replace(/\D/g, '');
		console.log('title: ' + title + '\nauthor: ' + author + '\nISBN: ' + isbn);

		function searchBook() {
			var queryURL;

			if (isbn) {
				var queryURL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '&key=' + key;
			} else {
				if (!title) {
					var queryURL = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:' + author + '&key=' + key;
				} else if (!author) {
					var queryURL = 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + title + '&key=' + key;
				} else {
					var queryURL =
						'https://www.googleapis.com/books/v1/volumes?q=intitle:' +
						title +
						'+inauthor:' +
						author +
						'&key=' +
						key;
				}
			}
			queryURL = queryURL.replace(/ /g, '%20');
			console.log(queryURL);


			var bookObject = {};

			$.ajax({
				url: queryURL,
				method: 'GET',
			}).then(function (response) {
				// Printing the entire object to console
				console.log(response);

				// Empty the contents of the book-results div
				$('#book-results').empty();

				if (response.totalItems == 0) {
					var noBooks = $('<h4>').text('No books found!');
					$('#book-results').append(noBooks);
				} else {
					// Constructing HTML containing the book information
					for (let i = 0; i < response.items.length; i++) {
						var bookImage = $('<img class=title>').attr(
							'src',
							'https://books.google.com/books?id=' +
							response.items[i].id +
							'&printsec=frontcover&img=1&zoom=1&edge=nocurl&source=gbs_api'
						);
						var bookTitle = $('<h4>').text(response.items[i].volumeInfo.title);
						var bookAuthor = $('<h5>').text(response.items[i].volumeInfo.authors[0]);
						var bookGenre = $('<h5 class=\'genre\'>').text(response.items[i].volumeInfo.categories[0]);
						var bookDescription = $('<p>').text(response.items[i].volumeInfo.description);
						var date = new Date(response.items[i].volumeInfo.publishedDate);
						var bookYear = $('<p  class=title>').text('Published: ' + date.getFullYear());
						var bookPages = $('<p  class=title>').text(response.items[i].volumeInfo.pageCount + ' pages');
						var bookCondition = $("<select id='condition'>").html(
							"<option value='Like New' selected='selected'>Like New</option><option value='Good'>Good</option><option value='Fair'>Fair</option><option value='Poor'>Poor</option>"
						);
						var bookSelect = $("<button type='button' class='select-book' data-id='" + [i] + "'>")
							// .attr('href', '')
							.text('Add this book');
						var line = $('<hr>');

						var lineBreak = $('</br>');
						bookObject = {
							isbn: response.items[i].volumeInfo.industryIdentifiers[0].identifier,
							title: response.items[i].volumeInfo.title,
							author: response.items[i].volumeInfo.authors[0],
							genre: response.items[i].volumeInfo.categories[0],
							// description: response.items[i].volumeInfo.description,
							pubYear: response.items[i].volumeInfo.publishedDate,
							numPages: response.items[i].volumeInfo.pageCount,
							imgurl: 'https://books.google.com/books?id=' + response.items[i].id + '&printsec=frontcover&img=1&zoom=1&edge=nocurl&source=gbs_api',
							email: $('#email').val()
						};
						var bookDiv = $('<div style="display:none" class="bookObject" id="book' + [i] + '">' + JSON.stringify(bookObject) + '</div>')
						// Append the new book content
						$('#book-results').append('<div class=\'newBook\' id=\'newBook' + [i] + '\'>');
						$('#newBook' + [i]).append(
							bookImage,
							bookTitle,
							bookAuthor,
							bookGenre,
							bookDescription,
							bookYear,
							bookPages,
							bookCondition,
							bookSelect,
							line,
							bookDiv
						);

						bookObject = {
							title: response.items[i].volumeInfo.title,
							author: response.items[i].volumeInfo.authors[0],
							genre: response.items[i].volumeInfo.categories[0],
							description: response.items[i].volumeInfo.description,
							year: response.items[i].volumeInfo.publishedDate,
							pages: response.items[i].volumeInfo.pageCount, 
							image: 'https://books.google.com/books?id=' + response.items[i].id + '&printsec=frontcover&img=1&zoom=1&edge=nocurl&source=gbs_api',
							email: $('#email').val()
						};
					}
				}

				console.log(bookObject);
				// return bookObject;
			});
		}

		searchBook();

	});
	$(document).on('click', '.select-book', function () {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		var btnID = $(this).attr("data-id");
		var bookID = "#book"+btnID;
		var bookData = $(bookID).text();
		var bookObjectData = JSON.parse(bookData)
		console.log(bookData);
		var isbn = bookObjectData.isbn;
		// console.log(dataText);
		console.log(bookObjectData);

		function addBook(event) {
			event.preventDefault();
			$.post("/api/addBook", bookObjectData);
			$newItemInput.val("");
		}

	})




	$('#clear').on('click', function (event) {
		$('#title').text('');
		$('#author').text('');
		$('#isbn').text('');
	});
});

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

			$.ajax({
				url: queryURL,
				method: 'GET',
			}).then(function(response) {
				// Printing the entire object to console
				console.log(response);

				// Empty the contents of the book-results div
				$('#book-results').empty();

				// Constructing HTML containing the book information
				for (let i = 0; i < response.items.length; i++) {
					var bookImage = $('<img>').attr(
						'src',
						'https://books.google.com/books?id=' +
							response.items[i].id +
							'&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
					);
					var bookTitle = $('<h4>').text(response.items[i].volumeInfo.title);
					var bookAuthor = $('<h5>').text(response.items[i].volumeInfo.authors[0]);
					var bookGenre = $('<h5>').text(response.items[i].volumeInfo.categories[0]);
					var bookDescription = $('<p>').text(response.items[i].volumeInfo.description);
					var date = new Date(response.items[i].volumeInfo.publishedDate);
					var bookYear = $('<p>').text('Published: ' + date.getFullYear());
					var bookPages = $('<p>').text(response.items[i].volumeInfo.pageCount + 'pages');
					var bookSelect = $("<button class='select-book'>")
						.attr('href', '')
						.text('Add this book');
					var lineBreak = $('</br>');

					// Append the new book content
					$('#book-results').append(
						lineBreak,
						bookImage,
						bookTitle,
						bookAuthor,
						bookGenre,
						bookDescription,
						bookYear,
						bookPages,
						bookSelect,
					);
				}
			});
		}

		searchBook();
		/*
		// Event handler for user clicking the select-book button
		$('.select-book').on('click', function(event) {
			// Preventing the button from trying to submit the form
			event.preventDefault();
			// Storing the book name
			var inputbook = $('#book-input')
				.val()
				.trim();

			// Running the searchBook function(passing in the book as an argument)
			searchBook(inputbook);
		});
*/
	});
});

var https =require('https');
var path = "/books/v1/volumes?q=isbn:1119056071&key=AIzaSyDB0TwWP5ouoFr37dmNo1r9HCRWzg3czsk";

var options = {
  	host: 'www.googleapis.com',
  	path: path,
	};

var str ='';
var objectJSON;

//Initiating the request that gets ISBN data 
https.request(options, function(res){
	res.on('data', function (chunk) {
    	str += chunk;
  		});
  	res.on('end', function () {
    	objectJSON=JSON.parse(str);
        //prints the title of the book
    	console.log(objectJSON.items[0].volumeInfo.title);
  		});
	}).end();
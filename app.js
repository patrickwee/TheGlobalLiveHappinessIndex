//******* SETUP Information *******
//1. Define the packages that we need!

var express = require('express');
var Request = require('request');
var bodyParser = require('body-parser');

//2. Instantiate that package!
var app = express();

//3. Tell App.Js where things are

// Set up the public directory to serve our Javascript file
app.use(express.static(__dirname + '/public'));
// Set EJS as templating language
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.engine('.css', require('ejs').__express);
app.set('view engine', 'html');

// Enable json body parsing of application/json
app.use(bodyParser.json());







//******* DATABASE Configuration *******
var CLOUDANT_USERNAME="pkw228";

//HAPPY KEY
var CLOUDANT_KEYhappy="metworeneretereplistrave";
var CLOUDANT_PASSWORDhappy="jacTDSlCIITndfvfmKrBCLlW";
var CLOUDANT_DATABASEhappy="happy";
var CLOUDANT_URLhappy = "https://" + CLOUDANT_USERNAME + ".cloudant.com/" + CLOUDANT_DATABASEhappy;


//SAD KEY
var CLOUDANT_KEYsad="toonsioneentrympleptaken";
var CLOUDANT_PASSWORDsad="dpX6qbWpFqrdatEMkEHPDDje";
var CLOUDANT_DATABASEsad="sad";
var CLOUDANT_URLsad = "https://" + CLOUDANT_USERNAME + ".cloudant.com/" + CLOUDANT_DATABASEsad;








//2.+++++++JSON--GETS ALL THE DATA+++++++++++++
app.get("/happy", function (request, response) {
	Request.get({
		url: CLOUDANT_URLhappy+"/_all_docs?include_docs=true",
		auth: {
			user: CLOUDANT_KEYhappy,
			pass: CLOUDANT_PASSWORDhappy
		}
	}, function (err, res, body){
		// Need to parse the body string
		console.log("HEY THERE! BODDY! ",body);
		var theBody = JSON.parse(body);
		var theData = theBody.rows;

		response.json(theData);
		console.log("reponded to json data!HEYHEYHEY");
		console.log(theData);

	});
});



app.get("/sad", function (request, response) {
	Request.get({
		url: CLOUDANT_URLsad+"/_all_docs?include_docs=true",
		auth: {
			user: CLOUDANT_KEYsad,
			pass: CLOUDANT_PASSWORDsad
		}
	}, function (err, res, body){
		// Need to parse the body string
		console.log("HEY THERE! BODDY! ",body);
		var theBody = JSON.parse(body);
		var theData = theBody.rows;

		response.json(theData);
		console.log("reponded to json data!HEYHEYHEY");
		console.log(theData);

	});
});
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//HOME
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//API DOCUMENTATION
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@




//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//INDIVIDUAL EVENT PAGE
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.get("/", function(request,response){
	response.render("index");
});

app.get("/home", function (request, response) {
	console.log("In main route");
	response.render('eventpage');
});


app.get("/thehappy", function (request, response) {
	console.log("In main route");
	response.render('happy');
});

app.get("/thesad", function (request, response) {
	console.log("In main route");
	response.render('sad');
});




//9.++++++++++++++THE CATCH ALL ROUTE++++++++++++++
//It goes here in case anything goes wrong.
app.get("*", function(request,response){
	response.render("join");
});







//******* LET THERE BE A WEBSITE! *******
var port = process.env.PORT || 2100;
app.listen(process.env.PORT || 2100);
//app.listen(3000);
console.log('Express started on port 2100');


var noteTemplate = function (data) {
	template = '<div class="note">';
	template += '<div><h2>'+ data.number +'</h2></div>';
	template += '</div>';

	return template;
};

// Loads all records from the Cloudant database. 
// Loops through them and appends each note onto the page.
function loadNotes() {
	happy=0;
	sad = 0;
	var firstGet = $.ajax({
		url: "/happy",
		type: "GET",
		data: JSON,
		error: function(resp){
			console.log(resp);
			console.log(resp);
		},
		success: function (resp) {
			console.log(resp);
			

			//Set the stuff coming in to successdata.
			var successdata=resp;
			console.log(successdata);

			var maxnumobj = _.max(resp, function(row){return row.doc.number;});
			console.log(maxnumobj);

			maxnum= maxnumobj.doc.number;
			maxnumdate= maxnumobj.doc.datetime;
			console.log(maxnum);
			happy=maxnum;
			happydate=maxnumdate;

			//var htmlString = noteTemplate(maxnumobj.doc);
			//$('#events').append(htmlString);
		}
	});
	
	var secondGet = $.ajax({
		url: "/sad",
		type: "GET",
		data: JSON,
		error: function(resp){
			console.log(resp);
		},
		success: function (resp) {
			console.log(resp);
			

			//Set the stuff coming in to successdata.
			var successdata=resp;
			console.log(successdata);

			var maxnumobj = _.max(resp, function(row){return row.doc.number;});
			console.log(maxnumobj);

			maxnum= maxnumobj.doc.number;
			maxnumdate= maxnumobj.doc.datetime;

			sad=maxnum;
			saddate=maxnumdate;


			//var htmlString = noteTemplate(maxnumobj.doc);
			//$('#events').append(htmlString);
			hello2=11;
		}
	});

	secondGet.then(function(){
		firstGet.done(function(){
			$("#malungkot").empty();
			$("#masaya").empty();


			happypercentage=happy/(happy+sad);
			sadpercentage=sad/(happy+sad);
			console.log(happypercentage);
			console.log(sadpercentage);

			totaltweets=happy+sad;
			$('#number').append("We have scoured over <strong>"+totaltweets+"</strong> tweets. Here's what we found out.");

			happyper=happypercentage*100.00;
			numh=happyper.toFixed(2);
			$('#masaya').append('<h1 style="font-size:200px;line-height:0.5em; margin-bottom:0.50em">'+ numh+ '</h1>');

			sadper=sadpercentage*100.00;
			nums=sadper.toFixed(2);
			$('#malungkot').append('<h1 style="font-size:200px;line-height:0.5em; margin-bottom:0.50em">'+ nums+ '</h1>');

			// $('#happydate').append(happydate);
			// $('#saddate').append(saddate);

		});
	});
}

$(document).ready(function(){
	console.log("Loaded!");
	loadNotes();
});

var instagramData = [];
var place="";

var noteTemplate = function (data) {
	template = ' <div class="container"><div class="page-header"><a href="/join">Back to the Event Central &raquo;</a>';
	template += '<h1>'+ data.name +'</h1></div>';
	template += '<div><h2>'+ data.place +'@'+ data.datetime +'</h2></div>';
	template += '<p class="lead">'+ data.description +'</p>';







	return template;
};

// Loads all records from the Cloudant database. 
// Loops through them and appends each note onto the page.
function loadNotes() {
	$.ajax({
		url: "/api/event/"+window.ename,
		type: "GET",
		data: JSON,
		error: function(resp){
			console.log("Error Function!");
			console.log(resp);
		},
		success: function (resp) {
			console.log("Success Function!");
			//console.log("BEFORE",datapassed);
			console.log(resp);
			nicedata=resp;

			console.log("AFTER",nicedata);
			var htmlString = noteTemplate(nicedata.doc);
			$('#stuff').append(htmlString);

			getInstagramData(nicedata.doc.instagram);

		}
	});
}


function createInstagramHTML(){
	//Figure out the length of the shorter array
	var htmlString = '';
	htmlString += '<div>';
	for(i=0;i<instagramData.length;i++){
		htmlString += '<h6 class="author">'+instagramData[i].user.full_name+ "'s Pictures"+'</h6>';
		htmlString += '<img src=' + instagramData[i].images.standard_resolution.url + ' /></br>';
	}
	htmlString += '</div></br></br></br>';
	$('#theInstagram').append(htmlString);
		
}
	
	

//Function to Get Instagram Data
function getInstagramData(){
	var searchTerm="happy";
	var myInstaKey = 'b42e3fad63d64cd69cd9f8a5765ffb1f';
	var instagramURL = 'https://api.instagram.com/v1/tags/'+searchTerm+'/media/recent?client_id=' + myInstaKey;

	$.ajax({
		url: instagramURL,
		type: 'GET',
		dataType: 'jsonp',
		error: function(data){
			console.log("Oh no");
			$('#loading').empty();
			$('#loading').append("Oops, no images were found!");
		},
		success: function(data){
			console.log("WooHoo Instagram");
			//console.log(data);

			instagramData = data.data;
			console.log(instagramData);
			
			//Genereate HTML
			createInstagramHTML();
			$('#loading').hide();
		}
	});
}

$(document).ready(function(){
	$('#loading').hide();
	console.log("Loaded!");
	loadNotes();
});
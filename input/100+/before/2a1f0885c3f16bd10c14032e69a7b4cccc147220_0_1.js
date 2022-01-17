function() {
	
	/*LETTER PANEL*/
	var char = 0;
	var html = "<div id='any' class='letter' style='margin-left:20px'>Any</div>";
	
	for ( var inc='A'.charCodeAt(0); inc <= 'Z'.charCodeAt(0); inc++  ) {
		html += "<div class='letter'>"+String.fromCharCode(inc)+"</div>";
	}
	
	$("div.letterPanel").html( html );
	
	$("div.letter").hover( function() {
		$(this).animate( {fontSize:"19px"}, 250 );
	},
	function() {
		$(this).animate( {fontSize:"14px"}, 250 );
	});
	
	
	/*BREED SELECTION*/
	
	function populateBreeds ( letter ) {
		var html = "";
		var regex = null;
		var any = letter=="Any";
		$.each(breeds, function (key, val) {
			regex = new RegExp("^"+letter);
			doAdd = val.name.match(regex);
			if (doAdd || any) html += "<div id='"+key+"' class='breedItem'><div class='breedItemText'>"+val.name+"</div></div>";
		});
		
		$("#breedList").html( html );
		
		$("div.breedItem:first").trigger("click");
	}
	
	/*EVENTS*/
		
	//POPULATE THE BREED SELECTION AREA
	$("div.letter").bind( "click", function() {
		if (! $(this).hasClass("div.letter_selected") ) {
			$("div.letter:*").removeClass("letter_selected");
			$(this).addClass("letter_selected");
			
			populateBreeds( $(this).html() );
		}
	});
	
	//POPULATE THE BREED CONTENT AREA
	$("div.breedItem").live( "click", function() {
		var id = $(this).attr("id");
		
		$("div#breedContent").empty().load( "./views/breed.html", function() {
			
			aBreed = breeds[id];
			var picsrc = "";
			$.each( aBreed, function (key, val) {
				$("#"+key).html( val );
				/*this put the picture src in the img tag*/
				if (key=="picfilename")
				{
					picsrc = "./pics/" + val;
					$("div#picfilename.breedImage").html("<a href='" + picsrc + "'><img src='" + picsrc + "' height='100' width='100' />");
				}
				/*Trying to get json data into training tips and healthissue sections of accordion*/
				if (aBreed.hashealthIssues != "false") //(aBreed.hasHealthIssue==true)
				{
					$("td#issue.value").html("" + aBreed.healthIssues.issue);
				}
				else $("td#issue.value").html("None."); 
				
				if (aBreed.hasTrainingTip !="false")
				{
					$("td#tip.value").html("" + aBreed.trainingTip.tip);
				}
				else $("td#tip.value").html("None.");
			});
			
		});
		
		$("div.breedItem:*").removeClass("breedItem_selected");
		$(this).addClass("breedItem_selected");
		
	});
	
	//The pages default selections.
	
	$("div#any").trigger("click");
	
}
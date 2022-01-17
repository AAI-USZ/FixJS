function() {
		var formatted = JSON.stringify({"points": schedule.getPoints()});
		var auth = $("#author").val();
		var desc = $("#description").val();
		var jqxhr = $.post( '/saveschedule', 
				{'schedulestring': formatted,
			     'author':         auth,
			     'description':    desc}, 
				function (response) {
			        // maybe alert the user that it was successful
			        alert("schedule saved successfully!" + response); // change to jqueryui widget
		        })
		  .error(function(resp) {alert("failed: " + resp);});
	}
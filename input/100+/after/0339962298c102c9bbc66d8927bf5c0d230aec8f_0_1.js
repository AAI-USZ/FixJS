function() {
		var formatted = JSON.stringify({"points": schedule.getPoints()});
		var auth = $("#author").val();
		var desc = $("#description").val();
		// popup a dialog saying 'saving' ----------------------- //////
		var jqxhr = $.post( '/saveschedule', 
				{'schedulestring': formatted,
			     'author':         auth,
			     'description':    desc}, 
				function (response) {
			    	 var res = JSON.parse(response); //error: no parse ????
			    	 if("success" in res) {
			    		 // change dialogs to jqueryui
			    		 alert("success: " + res.success);
			    	 } else {
			    		 alert("failed: " + res.error); // if we gave it bad data
			    	 }
		        })
		  .error(function(resp) {alert("ajax request failed: " + resp);}); // if the http request fails
	}
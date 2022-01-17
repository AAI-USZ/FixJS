function queueUp(accessibleBoolean){
	if ($("#urlField")[0].value != ""){
		// get data
		var category = $("#categoriesField")[0].value;
		var country = $("#countriesField")[0].value;
		var location = $("#locationsField")[0].value;
		var interest = $("#interestsField")[0].value;
		var reason = $("#reasonsField")[0].value; 
		var isp = $("#ispField")[0].value;
		var url = prepareURL($("#urlField")[0].value);
		var accessible = (accessibleBoolean ? 1 : 0);
		var comment = $("#commentField")[0].value;
		// store in db
		var db = connectToQueue();
		db.transaction(function (t){
			t.executeSql("INSERT INTO toSendQueue (category, country, location, interest, reason, isp, url, accessible, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
				[category, country, location, interest, reason, isp, url, accessible, comment],
				function (t, r){
					// begin checking until I can dequeue
					checkHerdict();
				},
				function (t, e){
					alert(e.message);
				}
			);
		});
		if (!randomMode){
			navigator.notification.alert("Your report has been recorded.", function (){}, "Thanks", "Ok");
		}
		$("#reportedContent").prepend("<div class='" + (accessible ? "" : "in") + "accessible'>" + $("#urlField")[0].value + "</div>");
		if ($("#reportedContent div").length > 4){
			$($("#reportedContent div")[4]).remove();
		}
		sitesReported++;
		$("#numberReported").html(sitesReported.toString());
		resetAllFields();
	}
}
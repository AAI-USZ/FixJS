function getCourseOptions(field) {
	// If it's blank, then set the value back to the default and do nothing
	if($(field).val() == "") {
		$(field).val(COURSE_PLACEHOLDER);
		$(field).css("color", "grey");
		$(field.parentNode.children[2]).slideUp();
		$(field.parentNode.children[2]).html("");
		return;
	}

	// It wasn't blank! Let's send it to the ajaxHandler
	$.post("./js/scheduleAjax.php", 
		{
			'action'     : 'getCourseOpts', 
			'course'     : $(field).val(), 
			'quarter'    : $('#quarter').val(),
			'ignoreFull' : $('#ignoreFull').prop('checked')
		} , 
		function(data) {		
		try {		
		// Grab the course options (results) div
		courseOpts = field.parentNode.children[2];

		// Process the resulting code
		jsonResult = eval(data);
		} catch(e) {
			$(courseOpts).html("<span>An Error Occurred!</span>");
			$(courseOpts).addClass("courseOptsError");
			$(courseOpts).slideDown();
			return;
		}

		if(jsonResult.error != null && jsonResult.error != undefined) {
			// Bomb out on an error
			$(courseOpts).html("<span>" + jsonResult.msg + "</span>");
			$(courseOpts).addClass("courseOptsError");
			$(courseOpts).slideDown();
			return;
		} else {
			// Empty out any currently showing courses
			$(courseOpts).empty();
			$(courseOpts).removeClass();
			$(courseOpts).addClass("courseOpts");
			
			// Create a header that will show the number of courses matched
			// and provide a link to expand them
			var listInfo = $("<span>").html(jsonResult.length + " Course Matches ");
			var expandLink = $("<a>").html("[ Show Matches ]");
			expandLink.attr("href", "#");

			// Create a list of courses (hidden at first)
			var listTable = $("<table>").addClass("courseOptsTable");
			for(var i = 0; i < jsonResult.length; i++) {
				// Add the row
				var row = $("<tr>");
				row.append(
					$("<td>").html(
						"<input type='checkbox' name='" + field.id + "Opt[]' value='" 
						+ jsonResult[i] + "' checked='checked'>")
				);
				row.append(
					$("<td>").html(jsonResult[i])
				);
				listTable.append(row);
			}

			// Append everything as it should be
			listInfo.append(expandLink);
			$(courseOpts).append(listInfo);
			$(courseOpts).append(listTable);
			$(courseOpts).slideDown();

			// Add click handler to the expand link that will show the list
			// of matching courses
			expandLink.click(function(event) {
				// Don't follow the link
				event.preventDefault();

				// Show the table (or hide it)
				$(this).parent().next().toggle();

				// Change the text
				if($(this).html() == "[ Show Matches ]") {
					$(this).html("[ Hide Matches ]");
				} else {
					$(this).html("[ Show Matches ]");
				}
			});
		}
	});
}
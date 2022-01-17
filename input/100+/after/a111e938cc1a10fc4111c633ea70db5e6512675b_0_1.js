function (err, url, line) {
			var dialog = $('<div title="An Error Occurred"></div>').css({overflow:"auto"}),
				errLines = err.split("\n");

			$.ajax({
				url : "logError.php",
				type : "POST",
				data : {
						message : err
				},
				success : function (data) {
						console.log("Logged error: " + data);
				},
				error : function () {
						console.log("Failed to log error");
				}
			});

			dialog.append("<h3>You should refresh the page now.</h3>");
			dialog.append("<p>If this error continues after refresh then use the Search by Name " +
				"page to load a different style into the editor.</p>");
			dialog.append("<h3>" + errLines[0] + "</h3>");
			errLines.splice(0, 1);
			if (errLines.length > 0) {
				//dialog.append("<ul><li>" + errLines.join("</li><li>") + "</li></ul>");
				dialog.append("<pre>" + errLines.join("\n") + "</pre>");
			} else {
				dialog.append("<p>url: " + url + "</p>");
				dialog.append("<p>line: " + line + "</p>");
			}

			dialog.dialog({
				width: 650,
				height: 400
			});
		}
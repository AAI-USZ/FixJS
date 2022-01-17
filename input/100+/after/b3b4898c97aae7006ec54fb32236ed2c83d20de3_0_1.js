function (err, url, line) {
			var dialog = $('<div title="An Error Occurred"></div>').css({overflow:"auto"}),
				errLines = err.split("\n"),
				refreshPage = $('<button>Refresh Page</button>'),
				resetButton = $('<button>Reset Everything</button>');

			$.ajax({
				url : "../logError.php",
				type : "POST",
				data : {
					message : err + "\nBrowser: " + JSON.stringify($.browser) +
						"\nUrl: " + url + "\nLine: " + line
				},
				success : function (data) {
					console.log("Logged error: " + data);
				},
				error : function () {
					console.log("Failed to log error");
				}
			});

			dialog.append($('<p/>').append(refreshPage).append(" try this first"));
			refreshPage.on("click", function () {
				window.location.reload();
			});

			dialog.append($('<p/>').append(resetButton).append(" unsaved work will be lost"));
			resetButton.on("click", function () {
				CSLEDIT.storage.clear();
				window.location.reload();
			});

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
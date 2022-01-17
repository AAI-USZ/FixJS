function(
				mime, data) {
			if (mime == "text/url") {
				window.location = data;
			} else if (mime == "text/error") {
				alert(data);
			}
			// This is the case we want:
			else if (mime == "text/email") {
				var button = document.getElementById("mailToProvider");
				// Check mail address:
				alert(data);
				// Note that clickMail() is defined in the library.js!
				button.setAttribute("onclick", "clickMail('" + data
						+ "', '[Hiwi-Börse:"
						+ document.getElementById("applications").innerText
						+ "]')");
			}
		}
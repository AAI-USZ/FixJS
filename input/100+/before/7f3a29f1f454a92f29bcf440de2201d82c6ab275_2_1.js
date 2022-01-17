function (jqXHR, textStatus) {
				console.log("ERROR retrieving locale data for " + lang);
				console.log("Falling back to en-US");

				thisLocale = locale["en-US"];
			}
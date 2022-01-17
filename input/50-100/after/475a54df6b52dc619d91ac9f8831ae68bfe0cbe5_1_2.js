function (data, status) {

			if(typeof data != "object"){
				location = location.protocol + "//" + location.host + "?returnUrl=" + location.pathname;
				return;
			}

			$("#path-name").text(newName);
			$("#path-description").html(markdown.Transform(newDescription));
			$("#path-cancel-button").click();
		}
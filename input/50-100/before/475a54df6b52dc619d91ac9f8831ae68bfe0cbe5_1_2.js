function (data, status) {

			$("#path-name").text(newName);
			$("#path-description").html(markdown.Transform(newDescription));
			$("#path-cancel-button").click();
		}
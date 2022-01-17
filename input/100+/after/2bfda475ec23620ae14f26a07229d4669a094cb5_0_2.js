function () {
		var url = "/" + $("#path-id").val() + "/edit";

		var newName = $("#path-edit-name-text").val();
		var newDescription = $("#path-edit-description-text").val();

		$("#path-description").html("");

		$.post(url, { Name: newName, Description: newDescription }, function (data, status) {

			$("#path-name").text(newName);
			$("#path-description").html(markdown.Transform(newDescription));
			$("#path-cancel-button").click();
		});

		return false;

	}
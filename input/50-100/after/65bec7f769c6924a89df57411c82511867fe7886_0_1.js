function () {
		//div to hide
		$("#path-information").addClass("hidden");

		//div to show
		$("#path-edit-div").removeClass("hidden");

		var pathName = $("#path-name").text().trim();
		var pathDescription = $("#path-description").text().trim();

		//set place holder
		$("#path-edit-name-text").val(pathName);
		//$("#path-edit-description-text").val(pathDescription);
		$("#path-edit-name-text").focus();

		return false;
	}
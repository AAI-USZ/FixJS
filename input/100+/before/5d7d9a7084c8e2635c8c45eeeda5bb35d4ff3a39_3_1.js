function (newSelectedCslId) {
		var oldSelectedCslId = selectedCslId;
		selectedCslId = newSelectedCslId;

		console.log("clearing " + oldSelectedCslId);

		editorElement.find('span[cslid="' + oldSelectedCslId + '"]').removeClass("highlighted");
		editorElement.find('span[cslid="' + oldSelectedCslId + '"]').removeClass("selected");

		console.log("selected node changed from " + oldSelectedCslId + " to " + selectedCslId);

		editorElement.find('span[cslid="' + selectedCslId + '"]').removeClass("highlighted");
		editorElement.find('span[cslid="' + selectedCslId + '"]').addClass("selected");
	}
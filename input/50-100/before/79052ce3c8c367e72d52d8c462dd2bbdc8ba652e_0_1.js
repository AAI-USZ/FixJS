function (selectedCslId) {
		editorElement.find('span[cslid="' + oldSelectedCslId + '"]').removeClass("highlighted");
		editorElement.find('span[cslid="' + oldSelectedCslId + '"]').removeClass("selected");
		oldSelectedCslId = selectedCslId;

		editorElement.find('span[cslid="' + selectedCslId + '"]').removeClass("highlighted");
		editorElement.find('span[cslid="' + selectedCslId + '"]').addClass("selected");
	}
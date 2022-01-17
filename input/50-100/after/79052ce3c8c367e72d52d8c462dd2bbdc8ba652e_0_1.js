function (newSelectedCslId) {
		editorElement.find('span[cslid="' + oldSelectedCslId + '"]').removeClass("highlighted");
		editorElement.find('span[cslid="' + oldSelectedCslId + '"]').removeClass("selected");
		oldSelectedCslId = selectedCslId;
		selectedCslId = newSelectedCslId;

		editorElement.find('span[cslid="' + selectedCslId + '"]').removeClass("highlighted");
		editorElement.find('span[cslid="' + selectedCslId + '"]').addClass("selected");
	}
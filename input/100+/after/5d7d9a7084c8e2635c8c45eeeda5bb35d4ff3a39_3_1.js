function (newSelectedCslId) {
		selectedCslId = newSelectedCslId;

		editorElement.find('span[cslid].highlighted').removeClass("highlighted");
		editorElement.find('span[cslid].selected').removeClass("selected");

		editorElement.find('span[cslid="' + selectedCslId + '"]').removeClass("highlighted");
		editorElement.find('span[cslid="' + selectedCslId + '"]').addClass("selected");
	}
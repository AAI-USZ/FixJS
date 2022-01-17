function toggleControls(n) {
		switch(n) {
			case "on":
				gebi("petForm").style.display = "none";
				gebi("clearData").style.display = "inline";
				gebi("showData").style.display = "none";
				gebi("addNew").style.display = "inline";
				break;
			case "off":
				gebi("petForm").style.display = "block";
				gebi("clearData").style.display = "inline";
				gebi("showData").style.display = "inline";
				gebi("addNew").style.display = "none";
				gebi("items").style.display = "none";
				break;
			default:
				return false;
		};
	}
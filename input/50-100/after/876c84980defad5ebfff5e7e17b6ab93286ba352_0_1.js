function manualOnClick(info, tab) {
		var imageUrl = info.linkUrl != null ? info.linkUrl : info.srcUrl;
		var manualCheck = /\[\d+-\d+\]/;
		var alphabetCheck = /\[\w-\w\]/;
		var url = prompt("Please enter the url", imageUrl);

		if(url) {
			if(manualCheck.exec(url) == null && alphabetCheck.exec(url) == null) {
				alert("This is not a valid fusk - http://example.com/[1-8].jpg");
				return false;
			}

			createTab(url, tab);
		}
	}
function fillVersions(element, data) {
		$('#' + element).empty();
    	if ((data != undefined || !isBlank(data)) && data != "") {
			for (i in data) {
				$('#' + element).append($("<option></option>").attr("value",data[i]).text(data[i]));
			}
			return true;
		}
	}
function fillVersions(element, data, from) {
		$('#' + element).empty();
    	if ((data != undefined || !isBlank(data)) && data != "") {
    		if ("getSQLFiles" == from) {
    			for (i in data) {
	    			var sep = new Array();
	    			sep = data[i].split("#SEP#");
	    			$('#' + element).append($("<option></option>").attr("value", sep[0] + "/" + sep[1]).text(sep[1]));
    			}
    		} else {
				for (i in data) {
					$('#' + element).append($("<option></option>").attr("value", data[i]).text(data[i]));
				}
    		}
			return true;
		}
	}
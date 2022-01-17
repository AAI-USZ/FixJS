function (tr, data) {
		if (data[0] == 'Reprocess') {
			var td = $(tr).find('td.kDataValue');
			$(td).html('<a href="javascript:kReprocessVideo(\'' +
			    vidid + '\');">' + $(td).text() + '</a>');
		}
	    }
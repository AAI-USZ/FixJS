function (tr, data) {
		var td;

		if (data[0] == 'Import') {
			td = $(tr).find('td.kDataValue');
			td.html('<a href="javascript:kImportDialog(\'' + vidid +
			    '\')">Import</a>');
			return;
		}

		if (data[0] == 'Reprocess') {
			td = $(tr).find('td.kDataValue');
			$(td).html('<a href="javascript:kReprocessVideo(\'' +
			    vidid + '\');">' + $(td).text() + '</a>');
			return;
		}

		if (data[0] == 'Download') {
			td = $(tr).find('td.kDataValue');
			$(td).html('<a href="/api/files/' +
			    vidid + '/video.mov">' + $(td).text() + '</a>');
			return;
		}
	    }
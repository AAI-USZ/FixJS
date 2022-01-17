function (tr, data) {
		var uuid = data[0];
		var vidobj = kVideos[uuid];
		var td;

		klink($(tr).find('td.kDataVideoID'), 'video');

		if (vidobj.state == 'unimported') {
			td = $(tr).find('td.kDataColumnDetails');
			td.html('<a href="javascript:kImportDialog(\'' + uuid +
			    '\')">Import</a>');
			return;
		}

		if (vidobj.state == 'reading') {
			td = $(tr).find('td.kDataColumnDetails');
			$('<div class="kProgressBar"></div>').appendTo(td).
			    progressbar({ 'value': Math.floor(
				(vidobj.frame / vidobj.nframes) * 100) });
			return;
		}
	    }
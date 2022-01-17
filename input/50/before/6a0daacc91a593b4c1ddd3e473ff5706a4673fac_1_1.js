function(data){
			$.unblockUI();
			openAddWindow('#cfExport');
			$('#download').removeAttr('style');
			$('#link').attr('href',data.download_link);
		}
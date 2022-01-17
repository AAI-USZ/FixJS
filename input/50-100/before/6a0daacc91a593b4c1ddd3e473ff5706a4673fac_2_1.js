function(data){
			$.unblockUI();
			openAddWindow('#export');
			$('#download').removeAttr('style');
			$('#downLink').attr('href',data.download_link);
			$('#export').window('refresh');
		}
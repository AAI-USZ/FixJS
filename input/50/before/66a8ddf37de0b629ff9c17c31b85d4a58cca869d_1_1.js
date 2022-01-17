function( event, ui ) {
			$('#search-box').val = ui.item.value;
			doSearch();
		}
function( event, ui ) {
			$('#search-box').val = ui.item.value;
			search_term = ui.item.value;
			changeHashTo(formatSearch(search_term, page, classFilter));
		}
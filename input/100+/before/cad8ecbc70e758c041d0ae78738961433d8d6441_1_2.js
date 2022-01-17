function(e) {
		var entry = $(this).parents('.page_browser_entry');
		var pn = $(entry).attr('id');
		if (confirm('Really delete page '+pn+'?')) {
			// get all revisions
			var pages = [];
			$.glue.backend({ method: 'glue.revisions', pagename: pn }, function(data) {
				for (var rev in data) {
					pages.push(pn+'.'+data[rev]);
				}
				// and delete them
				for (var page in pages) {
					// DEBUG
					//console.log('deleting '+pages[page]);
					$.glue.backend({ method: 'glue.delete_page', 'page': pages[page] });
				}
				// TODO (later): check if all revisions were indeed deleted
				// remove entry
				$(entry).hide('fast', function() {
					$(this).remove();
				});
			});
		}
		return false;
	}
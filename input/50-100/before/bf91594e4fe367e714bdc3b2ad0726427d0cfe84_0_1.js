function(i, el) {
					var id = $(el).attr('id');
					if(!id) return; // we need a unique reference
					selectedTabs.push({id:id, selected:$(el).tabs('option', 'selected')});
				}
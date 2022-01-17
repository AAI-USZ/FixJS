function(i, el) {
					var id = $(el).attr('id');
					if(!id) return; // we need a unique reference
					if(!$(el).data('tabs')) return; // don't act on uninit'ed controls
					if($(el).data('ignoreTabState')) return; // allow opt-out
					selectedTabs.push({id:id, selected:$(el).tabs('option', 'selected')});
				}
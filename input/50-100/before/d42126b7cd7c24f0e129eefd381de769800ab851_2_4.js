function( event, ui ) {
				$('#search-vocab-field').val(ui.item.label);
				if(view=='anzsrcfor'){
					subjectFilter = encodeURIComponent(ui.item.uri);
				}else subjectFilter = ui.item.label;
				changeHashTo(formatSearch(search_term,1,classFilter));
				//vocabLoadConcept(ui.item.uri, ui.item.vocab);
				//vocabLoadTree(ui.item.uri, ui.item.vocab);
			}
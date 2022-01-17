function( event, ui ) {
				if (ui.item.vocab != ''){
					
					$('#search-vocab-field').val(ui.item.label);
					vocabLoadConcept(ui.item.uri, ui.item.vocab);
					vocabLoadTree(ui.item.uri, ui.item.vocab);
				
				}
			}
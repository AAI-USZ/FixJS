function( event, ui ) {
				$('#search-vocab-field').val(ui.item.label);
				vocabLoadConcept(ui.item.uri, ui.item.vocab);
				vocabLoadTree(ui.item.uri, ui.item.vocab);
			}
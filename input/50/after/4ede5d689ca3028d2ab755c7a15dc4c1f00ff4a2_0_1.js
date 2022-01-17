function(element, entry) {
					$('quicksearch_submit').disable();
					$('quicksearch_submit').removeClassName('button-blue');
					$('quicksearch_submit').addClassName('button-silver');
					return entry;
				}
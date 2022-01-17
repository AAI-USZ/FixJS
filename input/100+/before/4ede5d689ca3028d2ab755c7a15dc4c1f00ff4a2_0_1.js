function() {
	if ($('searchfor')) {
		new Ajax.Autocompleter(
			"searchfor",
			"searchfor_autocomplete_choices",
			TBG.autocompleter_url,
			{
				paramName: "filters[text][value]",
				minChars: 2,
				indicator: 'quicksearch_indicator',
				callback: function() {
					$('quicksearch_submit').disable();
					$('quicksearch_submit').removeClassName('button-blue');
					$('quicksearch_submit').addClassName('button-silver');
				},
				afterUpdateChoices: function() {
					$('quicksearch_submit').enable();
					$('quicksearch_submit').removeClassName('button-silver');
					$('quicksearch_submit').addClassName('button-blue');
				},
				afterUpdateElement: TBG.Core._extractAutocompleteValue
			}
		);
	}
}
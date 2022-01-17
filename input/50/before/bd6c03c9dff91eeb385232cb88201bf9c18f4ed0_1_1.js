function() {
		// TODO: use .change event here
		$("#sidebar-left-data-selection-strc").click( $.proxy(function(event) {
			$(event.target).trigger("dataStructureDefinitionClicked.CubeViz");			
		}, this));
	}
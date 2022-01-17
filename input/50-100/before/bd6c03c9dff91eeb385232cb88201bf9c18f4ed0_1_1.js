function(allDSD) {
		this.emptyDataStructureDefinitions();
		
		var allDSD_length = allDSD.length;
		while(allDSD_length--) {
			this.addItem("sidebar-left-data-selection-strc",allDSD[allDSD_length]);
		}
		
		$("sidebar-left-data-selection-strc").trigger("dsdRendered.CubeViz");
		
		this.setSelectedDSD();
	}
function(allDS) {
		this.emptyDataSets();
		
		var allDS_length = allDS.length;
		while(allDS_length--) {
			this.addItem("sidebar-left-data-selection-sets",allDS[allDS_length]);
		}
		
		$("#sidebar-left-data-selection-sets").trigger("dsRendered.CubeViz");
		
		this.setSelectedDS();
	}
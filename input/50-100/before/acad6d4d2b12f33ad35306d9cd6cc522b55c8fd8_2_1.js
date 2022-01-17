function(changeto,changes){
		if(this.currentContentPanel != changeto || changeto == 1){
			this.contentPanelTransitionEffect('#contentpanel-'+this.currentContentPanel,'#contentpanel-'+changeto,changes);
			this.currentContentPanel = changeto;
		}
	}
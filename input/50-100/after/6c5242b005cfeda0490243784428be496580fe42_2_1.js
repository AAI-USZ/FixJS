function() {
		this.edittingMode = $$('body')[0].get('x_mode');
		this.sectionsEditorInit();
		
		if($('xNewsTickerContainer')) this.hideNewsTicker();
	}
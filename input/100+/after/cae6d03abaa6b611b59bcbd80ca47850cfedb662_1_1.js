function() {
		this.edittingMode = $$('body')[0].get('x_mode');
		this.initNewsTicker();
		this.sectionsEditorInit();
		
		if($('xNewsTickerContainer')) $('xNewsTickerContainer').hide();
	}
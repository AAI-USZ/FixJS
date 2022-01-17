function(){
		var dSlides = $.Deferred(),
			dConfig = $.Deferred();
		
		$.when(dSlides, dConfig).done(init);
		
		sliderio.view.editor.slider.build(function(){
			dSlides.resolve();
		});
		
		sliderio.view.editor.config.build(function(){
			dConfig.resolve();
		});
	}
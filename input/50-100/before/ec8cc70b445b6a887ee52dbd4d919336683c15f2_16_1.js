function(result){
		var frag = Can.buildFragment([result],[document.body]).fragment;
		
		// hook it up
		var hooks = $view.hookups;
		//$view.hookups = {};
		return hookupView(frag, hooks);
	}
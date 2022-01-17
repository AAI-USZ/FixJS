function(result){
		var frag = Can.buildFragment([result],[document.body]).fragment;
		// if we have an empty frag
		if(!frag.childNodes.length) { 
			frag.appendChild(document.createTextNode(''))
		}
		// hook it up
		var hooks = $view.hookups;
		//$view.hookups = {};
		return hookupView(frag, hooks);
	}
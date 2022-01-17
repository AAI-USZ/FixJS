function( fragment, hooks ) {
		//remove all hookups
		var hookupEls, len, i = 0,
			id, func, res,
			arr = [];
		
		Can.each(fragment.childNodes ? Can.makeArray(fragment.childNodes) : fragment, function(i, node){
			if(node.nodeType != 3){
				arr.push(node)
				arr.push.apply(arr, Can.makeArray( node.getElementsByTagName('*')))
			}
		});

		hookupEls = Can.filter(Can.$(arr), "[data-view-id]");
		len = hookupEls.length;

		for (; i < len; i++ ) {
			if ( hookupEls[i].getAttribute && (id = hookupEls[i].getAttribute('data-view-id')) && (func = hooks[id]) ) {

				func(hookupEls[i], id);
				delete hooks[id];
				hookupEls[i] && hookupEls[i].nodeType !== 11 && hookupEls[i].removeAttribute('data-view-id');
			}
		}
		return fragment;
		//copy remaining hooks back ... hooks w/i a hook?
		//$.extend($view.hookups, hooks);
	}
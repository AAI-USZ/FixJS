function(e){
		if ( e.type === 'keyup' && e.which === 27 ) { return base.close(); }

		var cur = base.isCurrent();
		// keep keyboard open if alwaysOpen or stayOpen is true - fixes mutliple always open keyboards or single stay open keyboard
		if ( !base.isVisible || (o.alwaysOpen && !cur) || (!o.alwaysOpen && o.stayOpen && cur && !base.isVisible) ) { return; }
		// ignore autoaccept if using escape - good idea?
		if ( e.target !== base.el && cur ) {
			// stop propogation in IE - an input getting focus doesn't open a keyboard if one is already open
			if ( base.allie ) {
				e.preventDefault();
			}
			base.close( o.autoAccept ? 'true' : false );
		}
	}
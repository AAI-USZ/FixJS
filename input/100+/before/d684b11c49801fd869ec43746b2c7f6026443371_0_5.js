function(e){
		// keep keyboard open if alwaysOpen or stayOpen is true - fixes mutliple always open keyboards or single stay open keyboard
		if ( !base.isVisible || (o.alwaysOpen && !base.isCurrent) || (!o.alwaysOpen && o.stayOpen && base.isCurrent) ) { return; }
		if ( e.type === 'keyup' && e.which === 27 ) { return base.close(); }

		// ignore autoaccept if using escape - good idea?
		if ( e.target !== base.el && $(e.target).closest('.ui-keyboard')[0] !== base.$keyboard[0] ) {
			// stop propogation in IE - an input getting focus doesn't open a keyboard if one is already open
			if ( base.allie ) {
				e.preventDefault();
			}
			base.close( o.autoAccept ? 'true' : false );
		}
	}
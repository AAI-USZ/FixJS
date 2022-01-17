function(e){
			base.escClose(e);
			// needed for IE to allow switching between keyboards smoothly
			if (base.allie && $(e.target).hasClass('ui-keyboard-input')) { $(e.target)[o.openOn](); }
		}
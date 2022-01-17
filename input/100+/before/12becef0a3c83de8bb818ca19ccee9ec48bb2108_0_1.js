function(goToNext, isAccepted){
		if (typeof o.switchInput === "function") {
			o.switchInput(base, goToNext, isAccepted);
		} else {
			var kb, stopped = false,
				all = $('.ui-keyboard-input'),
				indx = all.index(base.$el) + (goToNext ? 1 : -1);
			if (indx > all.length - 1) {
				stopped = o.stopAtEnd;
				indx = 0; // go to first input
			}
			if (indx < 0) {
				stopped = o.stopAtEnd;
				indx = all.length - 1; // stop or go to last
			}
			if (!stopped) {
				base.close(isAccepted);
				kb = all.eq(indx).data('keyboard');
				if (kb && kb.options.openOn.length) {
					kb.focusOn();
				}
			}
		}
		return false;
	}
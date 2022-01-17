function(set){
		var cur = $.keyboard.currentKeyboard || false;
		if (set) {
			cur = $.keyboard.currentKeyboard = base.el;
		} else if (set === false && cur === base.el) {
			cur = $.keyboard.currentKeyboard = '';
		}
		return cur === base.el;
	}
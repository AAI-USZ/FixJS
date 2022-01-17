function _onConnect() {
		Inspector.Debugger.enable();
		for (var i in _breakpoints) {
			var b = _breakpoints[i];
			if (b.active) {
				b.set();
			}
		}
	}
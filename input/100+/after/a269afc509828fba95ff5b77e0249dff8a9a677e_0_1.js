function _tt_open_() {
		var inf = _tt_inf;
		if (inf) {
			_tt_tip = inf.tip,
			_tt_ref = inf.ref;
			_tt_inf = null;

			var n = _tt_ref.$n();
			if (n && !zk(n).isRealVisible()) //gone
				return _tt_tip = _tt_ref = null;

			var params = inf.params,
				// B60-ZK-1222
				//
				// If the tooltip appears exactly at mouse pointer, a tooltipout event 
				// will be triggered that closes the tooltip immediately, then another 
				// tooltipover event will open the tooltip again...
				//
				// This bug has been reported to appear in firefox only.
			    currentPointer = zk.currentPointer,
				xy = params.x !== undefined ? [params.x, params.y]
							: (zk.ff !== undefined) ? [currentPointer[0]+1, currentPointer[1]+1] : currentPointer;
			_tt_tip.open(_tt_ref, xy, params.position ? params.position : params.x === null ? "after_pointer" : null, {sendOnOpen:true});
		}
	}
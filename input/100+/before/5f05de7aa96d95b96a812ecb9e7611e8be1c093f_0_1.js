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
				xy = params.x !== undefined ? [params.x, params.y]
							: zk.currentPointer;
			_tt_tip.open(_tt_ref, xy, params.position ? params.position : params.x === null ? "after_pointer" : null, {sendOnOpen:true});
		}
	}
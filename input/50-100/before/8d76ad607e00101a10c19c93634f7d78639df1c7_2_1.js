function (sel, opts) {
		var inp = this.getInputNode(),
			val = inp.value = sel ? sel.getLabel(): '';
		this.valueSel_ = val;
		this._hilite2(sel, opts);

		// Fixed IE/Safari/Chrome
		// ZK-518: Selected value in combobox is right aligned in FF5+ if width is smaller than selected option
		// setSelectionRange of FF5 or up will set the position to end,
		// call select() of input element for select all 
		if (val)
			if (zk.gecko)
				inp.select();
			else
				zk(inp).setSelectionRange(0, val.length);
	}
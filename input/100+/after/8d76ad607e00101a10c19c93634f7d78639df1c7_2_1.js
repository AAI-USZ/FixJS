function (sel, opts) {
		opts = opts || {};

		var oldsel = this._sel;
		this._sel = sel;

		if (oldsel && oldsel.parent == this) { //we don't clear _sel precisely, so...
			var n = oldsel.$n();
			if (n) jq(n).removeClass(oldsel.getZclass() + '-seld');
		}

		if (sel && !sel.isDisabled())
			jq(sel.$n()).addClass(sel.getZclass() + '-seld');

		if (opts.sendOnSelect && this._lastsel != sel) {
			this._lastsel = sel;
			if (sel) { //set back since _findItem ignores cases
				var inp = this.getInputNode(),
					val = sel.getLabel();
				this.valueEnter_ = inp.value = val;
				//Bug 3058028
				// ZK-518
				if (!opts.noSelectRange && !zk.ios) // prevent ios native keyboard showed
					if (zk.gecko)
						inp.select();
					else
						zk(inp).setSelectionRange(0, val.length);
			}

			if (opts.sendOnChange)
				this.$supers('updateChange_', []);
			this.fire('onSelect', {items: sel?[sel]:[], reference: sel});
				//spec change (diff from zk 3): onSelect fired after onChange
				//purpose: onSelect can retrieve the value correctly
				//If we want to change this spec, we have to modify Combobox.java about _lastCkVal
		}
		// B50-ZK-215: table width will fit to 100% of window width instead of its parent in IE6/7
		if (zk.ie < 8){
			var pp = this.getPopupNode_(),
				wd = pp.style.width;
			if (pp.firstChild && wd && wd != 'auto')
				pp.firstChild.style.width = zk(pp).revisedWidth(zk.parseInt(pp.style.width) - 1) + 'px';
		}
	}
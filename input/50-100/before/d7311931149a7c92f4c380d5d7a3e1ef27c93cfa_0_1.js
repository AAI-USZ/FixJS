function(base) {
			if (base.el.tagName === 'INPUT') { return false; } // ignore tab key in input
			base.insertText('\t');
		}
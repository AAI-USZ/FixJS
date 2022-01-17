function (e) {
				if (e.which === 37 || e.which === 38) { // left or up
					selectPrev($tabs, $panels, opts, false);
					e.preventDefault();
				} else if (e.which === 39 || e.which === 40) { // tab, right or down
					selectNext($tabs, $panels, opts, false);
					e.preventDefault();
				}
			}
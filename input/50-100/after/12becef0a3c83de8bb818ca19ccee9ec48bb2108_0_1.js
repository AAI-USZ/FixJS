function(base) {
			var tag = base.el.tagName, 
				o = base.options;
			
			if (tag === 'INPUT') {
				if (o.tabNavigation) {
					return base.switchInput(!base.shiftActive, true);    
				} else {
					// ignore tab key in input
					return false;
				}
			}
			
			base.insertText('\t');
		}
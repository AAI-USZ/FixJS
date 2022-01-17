function() {
				// Force initialization of tabsets to avoid layout glitches
				this.add(this.find('.cms-tabset')).redrawTabs();

				this.layout();
			}
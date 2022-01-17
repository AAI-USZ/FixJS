function() {
				if(window.debug) console.log('redraw', this.attr('class'), this.get(0));
				
				// Force initialization of tabsets to avoid layout glitches
				this.add(this.find('.cms-tabset')).redrawTabs();

				this.layout();
			}
function() {
				if(window.debug) console.log('redraw', this.attr('class'), this.get(0));

				this.layout({
					resize: false
				});
			}
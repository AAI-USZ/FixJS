function(type) {
				if(window.debug) console.log('redraw', this.attr('class'), this.get(0));
				
				$('.cms-tree')
					.toggleClass('draggable', this.val() == 'draggable')
					.toggleClass('multiple', this.val() == 'multiselect');
			}
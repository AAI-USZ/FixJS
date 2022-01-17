function(type) {
				$('.cms-tree')
					.toggleClass('draggable', this.val() == 'draggable')
					.toggleClass('multiple', this.val() == 'multiselect');
			}
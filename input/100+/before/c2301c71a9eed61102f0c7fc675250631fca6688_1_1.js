function (e) {
				var dims = b.getPosition();
				e.stop();
				var x = dims.x - this.filterContainer.getWidth();
				var y = dims.y + b.getHeight();
				var rx = this.filterContainer.getStyle('display') === 'none' ? this.filterContainer.show() : this.filterContainer.hide();
				this.filterContainer.fade('toggle');
				this.container.getElements('.filter, .listfilter').toggle();
			}
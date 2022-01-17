function (e) {
				var dims = b.getPosition();
				e.stop();
				var x = dims.x - this.filterContainer.getWidth();
				var y = dims.y + b.getHeight();
				this.filterContainer.toggle();
			}
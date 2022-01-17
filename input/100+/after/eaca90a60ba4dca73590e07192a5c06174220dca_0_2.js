function(e) {
				e.data.map.resizeContentArea();
				if (this.map == null) {
					e.data.map.initMap();
				}
				console.log(this);
			}
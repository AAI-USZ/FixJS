function(){
			this.labels = [];
			// On certain BlackBerry devices, we need to init to 16 not 1 to avoid some devices bugs (see #15677)
			var d = new Date(2000, 0, 16);
			for(var i = 0; i < 12; i++){
				d.setMonth(i);
				this.labels.push(this.format(d));
			}
		}
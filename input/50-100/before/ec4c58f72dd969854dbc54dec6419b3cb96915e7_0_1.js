function(){
			this.labels = [];
			var d = new Date(2000, 0, 1);
			for(var i = 0; i < 12; i++){
				d.setMonth(i);
				this.labels.push(this.format(d));
			}
		}
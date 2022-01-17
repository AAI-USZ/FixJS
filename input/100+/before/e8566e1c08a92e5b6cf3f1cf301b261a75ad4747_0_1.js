function(){
			// summary:
			//		Goes to now.
			var now = new Date(),
				h = now.getHours() + "",
				m = now.getMinutes();
			m = (m < 10 ? "0" : "") + m;
			this.set("colors", [h, m]);
			if(this.values){
				this.set("values", this.values);
				this.values = null;
			}else{
				this.set("values", [h, m]);
			}
		}
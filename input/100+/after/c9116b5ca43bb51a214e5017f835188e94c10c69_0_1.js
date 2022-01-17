function(event,nodeInterface,callback,args,value) {
		switch(nodeInterface){
			// On dynamic repositioning, the % value for position is calculated based on the media's current dimension.
				// (top/bottom values are calculated based on the current height value and left/right values are calculated based on the current width value).
			case "top":
			case "bottom":
			case "height": {
					value = this.calculatePercentageValue("height", value);
					this.setProperty(nodeInterface,value);
					break;
			}
			case "left":
			case "right": 
			case "width": {
					value = this.calculatePercentageValue("width", value);
					this.setProperty(nodeInterface,value);
					break;
			}
			case "bounds": {
					var bounds = value.split(",");
					this.setProperty("left", this.calculatePercentageValue("width",bounds[0]));
					this.setProperty("top", this.calculatePercentageValue("height",bounds[1]));
					this.setProperty("width", this.calculatePercentageValue("width",bounds[2]));
					this.setProperty("height", this.calculatePercentageValue("height",bounds[3]));
					break;
			}
			default: 
					this.setProperty(nodeInterface,value);
		}
		if (callback) {
			callback(args);
		}
	}
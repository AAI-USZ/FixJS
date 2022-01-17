function(setting) {
			if(setting == undefined) {
				this.type = $.helper.get("type");
				this.score = $.helper.get(this.type);
			} else {
				this.type == setting.type;
				this.score = setting.hard;
			}
		}
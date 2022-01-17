function(setting) {
			if(setting == undefined) {
				this.type = $.helper.get("type");
				this.score = $.helper.get(this.type);
			} else {
				console.log(setting);
				var type = setting.type;
				this.tp = 0;
				this.score = setting.num;
				this.tp = type;
			}
		}
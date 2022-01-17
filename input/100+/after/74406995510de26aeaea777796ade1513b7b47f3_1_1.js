function(){
			// summary:
			//		Fill in localized prev/current/next years
			// tags:
			//      protected

			var month = new this.dateClassObj(this.currentFocus);
			month.setDate(1);
			
			var y = month.getFullYear() - 1;
			var d = new this.dateClassObj();
			array.forEach(["previous", "current", "next"], function(name){
				d.setFullYear(y++);
				this._setText(this[name+"YearLabelNode"],
					this.dateLocaleModule.format(d, {selector:'year', locale:this.lang}));
			}, this);
		}
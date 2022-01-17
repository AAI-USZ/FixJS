function(/*String*/text){
			// tags:
			//		private
			this._set("label", text);
			this.labelNode.innerHTML = this._cv ? this._cv(text) : text;
		}
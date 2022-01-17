function(/*String*/text){
			this._set("label", text);
			this.labelNode.innerHTML = this._cv ? this._cv(text) : text;
		}
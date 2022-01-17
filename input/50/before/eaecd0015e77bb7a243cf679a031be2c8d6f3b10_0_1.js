function(){
		if(!this.has("filename"))
			this._processName();
		return this.get("filename");
	}
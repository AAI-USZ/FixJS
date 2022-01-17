function(initEvent){
		this.name = initEvent.details.login;
		this.id = initEvent.name;
		this.start = Math.floor(new Date().getTime() / 1000);
		this.state = initEvent.details.state;
		this._setStateData(initEvent.details);
		//this.statedata = initEvent.details.statedata;
		this.setWorking(initEvent);
		var now = Math.floor(new Date().getTime() / 1000);
		if(this._isWorking){
			this._working = now - initEvent.details.lastchange.timestamp;
			this._idleing = 0;
		} else {
			this._working = 0;
			this._idleing = now - initEvent.details.lastchange.timestamp;
		}
		//this._isWorking = false;
		this.lastchange = initEvent.details.lastchange.timestamp;
	}
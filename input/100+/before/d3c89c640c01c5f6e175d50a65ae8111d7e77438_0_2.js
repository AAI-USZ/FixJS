function(event){
		//var oldWorking = this._working;
		var now = Math.floor(new Date().getTime() / 1000);
		if(this._isWorking){
			this._working += (now - this.lastchange);
		} else {
			this._idleing += (now - this.lastchange);
		}
		this.setWorking(event);
		var out = {};
		out.oldState = this.state;
		out.newState = event.details.state;
		this.state = event.details.state;
		this._setStateData(event.details);
		//this.statedata = event.details.statedata;
		this.lastchange = event.details.lastchange.timestamp;
		dojo.publish('agentDashboard/agent/' + this.id + '/update', [this]);
		return out;
	}
function(){
		debug("[E2WebCore].updateItems");
		this.current.load();
		this.power.inStandby(this.onPowerStateAvailable.bind(this));
	}
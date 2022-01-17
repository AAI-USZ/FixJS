function(ev, args){
	ev = ev.toLowerCase();
	if(!(args instanceof Array)) args = [args];
	
	//GLobal
	if("client" in this){
		for(var i in this.client.events[ev]){
			if(this.client.events[ev].hasOwnProperty(i)){ 
				this.client.events[ev][i].apply(this, args);
				this.log("{{{ " + ev + " }}} on client ", this.client);
			}
		}
	}
	
	//Local
	for(var i in this.events[ev]){
		if(this.events[ev].hasOwnProperty(i)){
			this.events[ev][i].apply(this, args);
			if(!this.client){
				this.log("{{{ " + ev + " }}} on client ", this);
			}else{
				this.log("{{{ " + ev + " }}} on channel " + this.name, this);
			}
		}
	}
}
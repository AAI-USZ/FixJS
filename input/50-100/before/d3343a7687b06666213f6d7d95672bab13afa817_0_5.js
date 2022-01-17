function(o){
		//I may rename this to addChild in the future. Hmm...
		o.scene = this;
		if(o.onAdd !== undefined){o.onAdd();}
		this.rQ.push(o);
	}
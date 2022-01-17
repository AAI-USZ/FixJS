function () {
		//this.set({'playable': false});
		this.get('entity').attr({x: this.get('startX'), y: this.get('startY')});
		this.get('entity').trigger("NewDirection", this.get('startDir'));
		//destory old body
		//for ( i in this.get('body') ) {
		//	this.get('body')[i].get('entity').destroy();
		//}
		
		var bodyArray = [];
		bodyArray[0] = new Body();
		bodyArray[1] = new Body();
		bodyArray[0].get('entity').attr({x: this.get('entity').x - gameContainer.conf.get('gridSize'), y: this.get('entity').y}); 
		bodyArray[1].get('entity').attr({x: this.get('entity').x - gameContainer.conf.get('gridSize') * 2, y: this.get('entity').y});
		this.set({'body': bodyArray});
		this.set({'bodySize': this.get('body').length});
		this.set({'nextGrowAmount' : this.defaults.nextGrowAmount});
		this.set({'eatenThisLevel' : this.defaults.eatenThisLevel});
		
		
		
	}
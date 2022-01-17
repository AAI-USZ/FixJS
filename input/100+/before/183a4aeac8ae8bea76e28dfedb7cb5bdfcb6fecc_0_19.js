function() {
	
	var VisibileBubbles = [];
	
	//close all visibile infobubbles
	for (b=0; b<this.infoBubbles.length; b++){
		if (this.infoBubbles[b].isOpen()){
				this.infoBubbles[b].close();
				VisibileBubbles.push(this.infoBubbles[b]);	
		};	
	};
	
	//close all visibile directinfobubbles
	for (b=0; b<this.DirectinfoBubbles.length; b++){
		if (this.DirectinfoBubbles[b].isOpen()){
				this.DirectinfoBubbles[b].close();
				VisibileBubbles.push(this.DirectinfoBubbles[b]);	
		};	
	};
		
		this.MayBubblePop = false;
		
		return VisibileBubbles;
	
}
function(inSender, inEvent){
		var p = this.$.panels.getPanels();
		var index = 0;
		for(var x in p){
			if(p.hasOwnProperty(x)){
				if(p[x].kind.split(".")[1] === inEvent.name){
					this.$.panels.setIndex(index);
					if(p[x].onViewed && typeof(p[x].onViewed) === "function"){
						p[x].onViewed();
					}
					break;
				}
			}
			index++;
		}
	}
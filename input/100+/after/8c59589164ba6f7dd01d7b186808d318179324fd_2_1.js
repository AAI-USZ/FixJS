function(jdelm,model,controller) {
	var that=this;
	this.jdelm = jdelm;
	this.model = model;
	model.attach(this);
	this.eventviews = [];
	
	this.initiate = function() {
		debugger;
		that.jdelm.html("");
		that.eventviews = [];
		for(var key in mainPlaylist){
			temp1=$("</p>");
			that.eventviews.push(new EventView(temp1,mainPlaylist[key],null,new EventController2()));
			that.jdelm.append(temp1);
		  	//that.jdelm.append($("</p>").html(restaurants[i].getEvents()[0]).click(function(){alert("hej");}));
		}
	}
	this.update = function(param) {
		for(var key in that.eventviews) {
			that.eventviews[key].update();
		}
	}
	
}
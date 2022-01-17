function(parent,model,controller) {
	var _this=this;
	this.parent = parent;
	this.model = model;
	model.attach(this);
	
	this.update = function() {
		restaurants = _this.model.getRestaurants();
		for(var i=0,j=restaurants.length; i<j; i++){
		  parent.append($("</p>").html(restaurants[i].name));
		  parent.append($("</p>").html(restaurants[i].getEvents()[0]));
		  debugger;
		};
	}
	
}
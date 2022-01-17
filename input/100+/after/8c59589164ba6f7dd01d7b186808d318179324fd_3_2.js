function() {
	var that = this;
	this.playlist = [];
	this.listeners = [];
	this.restaurants = [];
	this.pushRestaurant = function(restaurant){that.restaurants.push(restaurant);};
	this.getRestaurants = function(){return that.restaurants;}
	this.getCampaigns = function() {
		var out = new Array();
		var temp=null;
		for(var i=0,j=that.restaurants.length; i<j; i++){
		  temp=that.restaurants[i].getCampaigns();
		  for(var i=0,j=temp.length; i<j; i++){
			out.push(temp[i]);
		  };
		};
		return out;
	}
	this.getEvents = function() {
		return that.playlist;
	}
	
	this.attach = function(observer) {that.listeners.push(observer);}
	this.notifyChange = function(param) {
		for(var i=0,j=that.listeners.length; i<j; i++){
		  that.listeners[i].update(that,param);
		}
	}	
}
function(name) {
	var that=this;
	this.name =name;
	this.adress ="";
	this.website="";
	this.playlist = [];
	this.campaigns = [];
	
	this.pushEvent = function(sportEvent) {that.playlist.push(sportEvent); sportEvent.subscribe(that); return that;};
	this.getEvents = function() {return that.playlist;}
	this.pushCampaign = function(campaign) {that.campaigns.push(campaign); return that;};
	this.getCampaigns = function(){return that.campaigns};
}
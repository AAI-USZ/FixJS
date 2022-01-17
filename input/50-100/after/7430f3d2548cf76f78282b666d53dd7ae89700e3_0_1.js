function OSMHell(){
	
	OSMHell.API_URL = hell.p.urlsearch + '/searchselect';

	this.cityView = null;
	this.streetView = null;
	this.buildingView = null;
	
	this.cities = {};
	
	this.coordsCache = {};
}
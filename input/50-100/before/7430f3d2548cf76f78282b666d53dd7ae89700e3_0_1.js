function OSMHell(){
	
	OSMHell.API_URL = hell.p.urlapi + '/searchselect';

	this.cityView = null;
	this.streetView = null;
	this.buildingView = null;
	
	this.cities = {};
	
	this.coordsCache = {};
}
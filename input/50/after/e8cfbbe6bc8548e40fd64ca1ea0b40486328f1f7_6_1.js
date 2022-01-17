function vxlLookupTableManager(){

	this.lutTimerID = 0;

	this.tables = [];
	this.location = "";

	vxl.go.notifier.addSource(vxl.events.DEFAULT_LUT_LOADED,this);
}
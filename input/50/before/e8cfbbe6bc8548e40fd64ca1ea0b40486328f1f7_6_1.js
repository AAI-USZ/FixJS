function vxlLookupTableManager(){

	this.lutTimerID = 0;

	this.tables = [];

	vxl.go.notifier.addSource(vxl.events.DEFAULT_LUT_LOADED,this);
}
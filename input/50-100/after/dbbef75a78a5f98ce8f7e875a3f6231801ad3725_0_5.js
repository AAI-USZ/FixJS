function(onComplete) {
	this._onComplete = onComplete;
	haxe.Log.trace("RUNNING...",{ fileName : "RoomFiller.hx", lineNumber : 89, className : "glidias.RoomFiller", methodName : "run"});
	this.createFirstRoom();
	if(this.async == 0) {
	} else {
	}
}
function() {
	var t = this.tl.tracker;
	if(t.events.length == 0)
		return;

	var e = t.events.pop();
	switch(e.type){
		case "move":	t.undoMove(e);break;
		case "create":	t.undoCreate(e);break;
		case "delete":	t.undoDelete(e);break;
		case "update":	t.undoUpdate(e);break;
		case "resize":	t.undoResize(e);break;
	}
	// Debug
	t.updateDebug();
}
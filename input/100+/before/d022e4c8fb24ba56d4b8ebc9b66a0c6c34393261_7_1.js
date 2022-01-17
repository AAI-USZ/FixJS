function() {
	var t = this.tl.tracker;
	if(t.events.length == 0)
		return;

	var e = t.events.pop();
	
	if(e.type == "move")
		t.undoMove(e);
	if(e.type == "create")
		t.undoCreate(e);
	if(e.type == "delete")
		t.undoDelete(e);
	if(e.type == "update")
		t.undoUpdate(e);
	if(e.type == "resize")
		t.undoResize(e);
	
	// Debug
	t.updateDebug();
}
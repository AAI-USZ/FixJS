function(evt) {
	var _e = evt || window.event;
	_e.cancelBubble = true ;
	eXo.core.DragDrop.init(null, this, this.parentNode.parentNode, evt);
}
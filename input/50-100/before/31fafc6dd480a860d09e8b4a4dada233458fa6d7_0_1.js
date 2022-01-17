function isHidden(/*dijit._Widget || DomNode*/ node){
	// summary:
	//		Return true if node/widget is hidden
	var p;
	if(node.domNode){ node = node.domNode; }
	return (dojo.style(node, "display") == "none") ||
		(dojo.style(node, "visibility") == "hidden") ||
		(p = dojo.position(node, true), p.y + p.h < 0 || p.x + p.w < 0 || p.h <= 0 || p.w <= 0);
}
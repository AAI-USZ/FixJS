function isVisible(/*dijit._WidgetBase || DomNode*/ node){
	// summary:
	//		Return true if node/widget is visible
	var p;
	if(node.domNode){ node = node.domNode; }
	return (domStyle.get(node, "display") != "none") &&
		(domStyle.get(node, "visibility") != "hidden") &&
		(p = domGeometry.position(node, true), p.y + p.h >= 0 && p.x + p.w >= 0 && p.h && p.w);
}
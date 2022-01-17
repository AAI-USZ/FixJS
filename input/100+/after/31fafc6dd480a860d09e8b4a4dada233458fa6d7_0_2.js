function innerText(/*DomNode*/ node){
	// summary:
	//		Browser portable function to get the innerText of specified DOMNode
	return node.textContent || node.innerText || "";
}
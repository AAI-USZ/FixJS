function followAnchor(link)
{
	link.setAttribute("selected", "true");
	var busy = iui.gotoView(link.hash.substr(1), false);
	// clear selected immmediately if busy, else wait for transition to finish
	setTimeout(function() {link.removeAttribute("selected")}, busy ? 0 : 500);   
}
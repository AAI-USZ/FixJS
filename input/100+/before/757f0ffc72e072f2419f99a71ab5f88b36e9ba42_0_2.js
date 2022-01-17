function followAnchor(link)
{
	function unselect() { link.removeAttribute("selected"); }
	
	if (!iui.busy)
	{
		iui.busy = true;
		link.setAttribute("selected", "true");
		// We need to check for backlinks here like in showPageID()
		// That backlink functionality needs to be in here somewhere
		iui.showPage($(link.hash.substr(1)));
		setTimeout(unselect, 500);
	}
}
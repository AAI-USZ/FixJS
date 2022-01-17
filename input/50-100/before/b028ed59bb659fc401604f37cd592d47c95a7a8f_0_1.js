function(tab){
	var t=this;

	tab.firstChild.className = '';
	tab.setAttribute("aria-selected", false);
	tab.setAttribute("aria-expanded", false);
	tab.tabIndex = -1;
}
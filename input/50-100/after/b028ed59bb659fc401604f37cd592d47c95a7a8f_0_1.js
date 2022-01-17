function(tab){
	var t=this;

	tab.getElementsByTagName("a")[0].className = '';
	tab.setAttribute("aria-selected", false);
	tab.setAttribute("aria-expanded", false);
	tab.tabIndex = -1;
}
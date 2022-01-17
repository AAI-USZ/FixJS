function applyHref(d, el) {
	// in the next-list the list is created based on the links, the lastest-list is
	// built using LI-nodes which contain links.
	if (el.nodeName !== 'A')
		el = el.querySelector('a');
		
	el.setAttribute('href', d.url);
}
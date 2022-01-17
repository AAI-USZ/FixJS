function pushState(that) {
	var breadcrumb = getNewBreadcrumb(that);

	options = {'url': window.location.pathname};
	window.History.pushState({'breadcrumb': breadcrumb.html()},
				 $(that).attr('title'),
				 $(that).attr('href'));
    }
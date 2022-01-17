function(event){
	var content_only = $(this).attr('rel') == 'ajax-content';
	var breadcrumb = getNewBreadcrumb(this);

	options = {'url': window.location.pathname};
	window.History.pushState({'breadcrumb': breadcrumb.html(),
				  'content_only': content_only},
				 $(this).attr('title'),
				 $(this).attr('href'));
	return false;
    }
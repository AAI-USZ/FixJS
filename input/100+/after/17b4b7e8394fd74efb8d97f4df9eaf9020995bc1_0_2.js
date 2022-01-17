function(event){
	var content_only = $(this).attr('rel') == 'ajax-content';
	var breadcrumb = getNewBreadcrumb(this);
	var navbar_id = $('#navbar-main-list > li.active').prop('id');

	options = {'url': window.location.pathname};
	window.History.pushState({'breadcrumb': breadcrumb.html(),
				  'content_only': content_only,
				  'navbar_id': navbar_id},
				 $(this).attr('title'),
				 $(this).attr('href'));
	return false;
    }
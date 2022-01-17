function switchTo(id) {
	
	navid = "#nav-"+id;
	contentid = "#content-"+id;
	
	fromnavid = $('.nav-active a').attr('id'); // Get current active element's id
	fromcontid = "#content-"+fromnavid.split('-')[1];
	
	removeActiveClass(); // Remove active class from all elements
	
	$(navid).parent().addClass('nav-active'); // Add active class to the current element
	
	$(fromcontid).hide('slideUp', function() { $(contentid).slideDown({duration:'slow'}); });
	
	$(fromcontid).removeClass('content-active');
	$(contentid).addClass('content-active');
	$(contentid).focus();
	
	// Call trigger for the app that has been switched to
	$(document.body).trigger(id+'-switched');
	//if(id == 'notepad') { refreshNotes(); }
}
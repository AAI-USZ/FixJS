function(doc) {
	var website_fields_list = ['page_name', 'website_image', 'web_short_description',
								'web_long_description']
	if (cint(doc.show_in_website)) {
		unhide_field(website_fields_list);
	} else {
		hide_field(website_fields_list);
	}
}
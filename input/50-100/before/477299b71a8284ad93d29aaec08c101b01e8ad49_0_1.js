function() {
	jQuery("#slide_list").sortable({
		update: function(event, ui) {
			refresh_order(jQuery("#add_slide").attr('code_pays'))
		}
	});
}
function updateListFilter() {

	var associated_list = $(this).attr('data-associated-list');

	if (associated_list.length) {

		var filter_attribute = $(this).attr('data-filter-attribute');
		var filter_text = $(this).val();
		var default_text = $('.list-filter-default[data-associated-list="' + associated_list + '"]');

		var items = $('ul[data-list-name="' + associated_list + '"] li');
		var filtered_items = items.filter(function () { return ($(this).attr(filter_attribute).indexOf(filter_text) > -1); });

		if (filtered_items.length) {
			default_text.hide();

			var filtered_out_items = items.filter(function () { return ($(this).attr(filter_attribute).indexOf(filter_text) == -1); });

			filtered_items.show(100);
			filtered_out_items.hide(100);
		} else {
			default_text.show(100);
			items.hide(100);
		}
	}
}
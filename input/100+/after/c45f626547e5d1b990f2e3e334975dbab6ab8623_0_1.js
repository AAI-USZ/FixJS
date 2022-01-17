function () {
		var select = $(this);
		var options = select.children('option');
		var disable_blur = false;
		var selection_index = 0;

		var tag_list = $(document.createElement('div'));
		tag_list.attr('class', select.attr('class'));
		tag_list.addClass('tag-list');
		select.after(tag_list);

		var ul = $(document.createElement('ul'));
		ul.addClass('tags');
		tag_list.append(ul);

		var input_li = $(document.createElement('li'));
		input_li.addClass('input');
		ul.append(input_li);

		var input = $(document.createElement('input'));
		input.attr('type', 'text');
		input_li.append(input);

		var suggestions = $(document.createElement('ul'));
		suggestions.addClass('suggestions');
		tag_list.append(suggestions);

		var no_result = $(document.createElement('li'));
		no_result.addClass('empty');
		no_result.text('No result');
		suggestions.append(no_result);

		function valueSelected(value) {
			var option = options.filter('[value="' + value + '"]');

			return option.is('[selected]');
		}

		function selectValue(value) {
			var option = options.filter('[value="' + value + '"]');

			option.attr('selected', 'selected');
		}

		function unselectValue(value) {
			var option = options.filter('[value="' + value + '"]');

			option.removeAttr('selected');
		}

		function removeTag(value) {
			var li = ul.children('li.tag[data-value="' + value + '"]');

			li.remove();
		}

		function addTag(value, label) {
			var li = $(document.createElement('li'));
			li.addClass('tag');
			li.attr('data-value', value);
			li.text(label);

			var a = $(document.createElement('a'));
			a.attr('href', '');
			a.click(function() { removeTag(value); unselectValue(value); return false; });
			li.append(a);

			var last_tag = ul.children('li.tag:last');

			if (last_tag.length) {
				li.insertAfter(last_tag);
			} else {
				ul.prepend(li);
			}
		}

		function updateFilter() {

			var top = tag_list.position().top + tag_list.outerHeight();
			var left = input.position().left;

			suggestions.css({ top: top + "px", left: left + "px" });

			var filter_text = input.val().toUpperCase();
			var items = suggestions.children('li.value');
			var unselected_items = items.filter(function () { return !valueSelected($(this).attr('data-value')); });
			var filtered_items = unselected_items.filter(function () { return ($(this).attr('data-label').toUpperCase().indexOf(filter_text) > -1); });

			items.hide();
			items.removeClass('selection');

			if (filtered_items.length) {
				no_result.hide();
				filtered_items.show();

				var index = (selection_index >= filtered_items.length) ? filtered_items.length - 1 : selection_index;

				$(filtered_items[index]).addClass('selection');
				input.removeClass('empty');
			} else {
				no_result.show();
				input.addClass('empty');
			}
		}

		// Convenience: clicking on the tag_list focuses the input.
		tag_list.click(function() { input.focus(); });

		// Convenience: focusing or bluring the input, apply/disable a style on the
		// tag_list.
		input.focus(function() { tag_list.addClass('focused'); updateFilter(); suggestions.show(); });
		input.blur(function(evt) { tag_list.removeClass('focused'); if (!disable_blur) { suggestions.hide(); input.val(''); } });

		input.bind('input', function(evt) {
			updateFilter();
		});

		input.keydown(function(evt) {
			if (evt.which == 13) { // Return
				evt.preventDefault();

				var items = suggestions.children('li.value.selection');

				if (items.length) {
					var value = $(items[0]).attr('data-value');
					var text = $(items[0]).attr('data-label');
					selectValue(value);
					addTag(value, text);
					input.val('');
					selection_index = 0;

					updateFilter();
				}
			} else if (evt.which == 8) { // Backspace

				// If the input is empty, remove the last tag.
				if (input.val() == '') {
					evt.preventDefault();

					var last_tag = ul.children('li.tag:last');

					if (last_tag) {
						var value = last_tag.attr('data-value');
						unselectValue(value);
						last_tag.remove();
					}
				}

				updateFilter();
			} else if (evt.which == 38) { // Up
				selection_index = (selection_index > 0) ? selection_index - 1 : 0;
				updateFilter();
			} else if (evt.which == 40) { // Down
				var filtered_items_count = suggestions.children('li.value').filter(':visible').length;
				selection_index = (selection_index < filtered_items_count - 1) ? selection_index + 1 : filtered_items_count - 1;
				updateFilter();
			}
		});

		suggestions.mouseenter(function () {
			disable_blur = true;
		});

		suggestions.mouseleave(function () {
			disable_blur = false;

			if (!input.is(':focus')) {
				suggestions.hide();
				input.val('');
			}
		});

		// Populates the suggestions
		options.each(function() {
			var option = $(this);
			var item = $(document.createElement('li'));
			item.addClass('value');
			item.attr('data-value', option.val());
			item.attr('data-label', option.text());
			item.text(option.text());

			item.click(function() {
				selectValue(option.val());
				addTag(option.val(), option.text());
				input.val('');
			});

			var last_item = suggestions.children('li.value:last');

			if (last_item.length) {
				item.insertAfter(last_item);
			} else {
				suggestions.prepend(item);
			}
		});

		// Populates the list with the selected options
		options.filter(':selected').each(function () {
			var option = $(this);
			addTag(option.val(), option.text());
		});

		suggestions.hide();
		select.hide();
	}
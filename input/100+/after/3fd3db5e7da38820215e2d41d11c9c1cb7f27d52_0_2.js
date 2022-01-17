function(index, option) {
				var mouseenter = function(event) {
					handleMouseenter(event, index);
				};

				var mousedown = function(event) {
					handleMousedown(event, index);
				};

				var item = {
					option:		$(option),					// original option
					selected:	$(option).is(':selected'),	// initial state
					disabled:	$(option).is(':disabled')	// initial state
				};

				item.container	= $('<div class="multiselect-option"/>')
									[item.disabled? 'addClass' : 'removeClass']('multiselect-disabled')
									[item.selected? 'addClass' : 'removeClass']('multiselect-selected')
									.mousedown(mousedown)
									.mouseenter(mouseenter)
									.appendTo(select)
									;
				item.checkbox	= $('<input type="'+(max <= 1 ? 'radio' : 'checkbox')+'"/>')
									.attr('disabled', item.disabled)
									.attr('checked', item.selected)
									.click(function(event) {
										event.preventDefault();
										return false; })
									.appendTo(item.container);

				var text		= item.option.text();
				if (typeof options.showOption == 'function') {
					text = options.showOption(text, item.option.val(), index);
				}
				$('<span>'+text+'</span>').appendTo(item.container);

				items[index] = item;
			}
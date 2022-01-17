function() {
			var element	= this;

			$(element).hide();

			if (_options) {
				$.extend(options, _options);
			}

			var items			= [];

			var min = 0;
			switch (true) {
				case $(element).is('[min]'):
					min = $(element).attr('min');
					break;
				case typeof options.min !== 'undefined':
					min = options.min;
					break;
				case $(element).is(':not([multiple])'):
					min = 1;
					break;
			}

			var max = 9007199254740992;
			switch (true) {
				case $(element).is('[max]'):
					max = $(element).attr('max');
					break;
				case typeof options.max !== 'undefined':
					max = options.max;
					break;
				case $(element).is(':not([multiple])'):
					max = 1;
					break;
			}
			max = Math.max(max, min);

			var currentIndex	= null;
			var currentState	= null;

			$(window).mouseup(function(event) {
				currentState			= null;
			});

			var allowState = function(state) {
				if (state && max == 1) {
					$.each(items, function() {
						if (!this.container.is('.multiselect-disabled') && this.container.is('.multiselect-selected')) {
							set_state(false, this, options);
						}
					});
				}

				var selected = $('.multiselect-selected', select).length;

				if (state) {
					if (selected + 1 > max) {
						return false;
					}
				} else {
					if (selected - 1 < min) {
						return false;
					}
				}
				return true;
			}

			var handleMouseenter = function(event, index) {
				if (event.which == 1) {
					if (currentState !== null && !items[index].container.is('.multiselect-disabled') && allowState(currentState)) {
						set_state(currentState, items[index], options);
						$(element).trigger('change');
					}
				}
			};

			var handleMousedown = function(event, index) {
				if (event.which == 1) {
					event.stopPropagation();

					var range = null;
					if (event.shiftKey) {
						range = items.slice(Math.min(currentIndex, index), Math.max(currentIndex, index) + 1);
					} else {
						range = [items[index]];
					}

					currentState	= !items[index].container.hasClass('multiselect-selected');
					currentIndex	= index;

					var changed = false;
					$.each(range, function() {
						if (!this.container.is('.multiselect-disabled') && allowState(currentState)) {
							set_state(currentState, this, options);
							changed = true;
						}
					});

					if (changed) {
						$(element).trigger('change');
					}
				}
			};

			var width	= options.width == 'exact'?		$(element).width()+'px'
						: is_numeric(options.width)?	options.width+'px'
						: options.width?				options.width
						:								($(element).width()+24)+'px'
						;
			var height	= options.height == 'exact'?	$(element).height()+'px'
						: is_numeric(options.height)?	options.height+'px'
						: options.height?				options.height
						:								$(element).height()+'px'
						;
			var select = $('<div tabindex="0" class="multiselect-select" style="height:'+height+';width:'+width+';"/>')
							.on('selectstart', function(event) { return false; })
							.insertAfter(element);

			$('option', element).each(function(index, option) {
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
			});

			// Handle form reset
			$(element).closest('form').on('reset', function() {
				// set only this, not actual select?
				$.each(items, function(index, item) {
					set_state(item.selected, item, options);
				});
			});
		}
function (element, valueAccessor, allBindingsAccessor, viewModel) {
			var $element = $(element),
				options = ko.utils.unwrapObservable(valueAccessor()),
				context = options.context;  // pass to draggable event handler
			if (context === undefined) {
				context = viewModel;
			}
			delete options.context;
			$element.droppable($.extend({
				addClasses: false,
				tolerance: 'pointer',
				drop: function (e, ui) {
					ui.draggable.trigger('dropped', [context]);
				}
			}, options));
		}
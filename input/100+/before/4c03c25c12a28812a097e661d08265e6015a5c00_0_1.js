function (element, valueAccessor, allBindingsAccessor, viewModel) {
			var $element = $(element), options = ko.utils.unwrapObservable(valueAccessor());
			$element.droppable($.extend({
				addClasses: false,
				tolerance: 'pointer',
				drop: function (e, ui) {
					ui.draggable.trigger('dropped', [viewModel]);
				}
			}, options));
		}
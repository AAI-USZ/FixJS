function (element, valueAccessor, allBindingsAccessor, viewModel) {
			$(element).empty();
			var text = ko.utils.unwrapObservable(valueAccessor());
			if (text) {
				$.each(text.split(/[\r\n]+/), function (i, line) {
					var div = $(document.createElement('div'));
					div.text(line);
					div.html(div.html().replace(
							/(https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/g,
							'<a href="$1" target="_blank">$1</a>'));
					div.appendTo(element);
				});
			}
		}
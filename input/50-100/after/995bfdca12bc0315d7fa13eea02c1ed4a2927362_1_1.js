function (i, line) {
					var e = $(document.createElement('div'));
					e.text(line);
					e.html(e.html().replace(
							/(https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/g,
							'<a href="$1" data-bind="click: $.noopTrue, clickBubble: false">$1</a>'));
					$element.append(e);
				}
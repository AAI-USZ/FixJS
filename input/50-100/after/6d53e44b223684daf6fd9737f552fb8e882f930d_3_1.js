function() {

			var self = this,
				tabs = $('<ul />'),
				content = $('<ul />'),
				container = self._container;

			container.empty();

			tabs.addClass('tabs');

			content.addClass('content');

			container.append( tabs )
					 .append( content );

			self._tabs = tabs;
			self._content = content;
		}
function() {

			var self = this,
				tabs = $('<ul />'),
				content = $('<div />'),
				container = self._container;

			container.empty();

			tabs.addClass('tabs');

			content.addClass('content');

			container.append( tabs )
					 .append( content );
		}
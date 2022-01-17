function( evt ) {

			var tab,
				self = this,
				tabsMan = self.sandbox.tabsManager,
				container = $('<div />'),
				closeButton = $('<button />'),
				iframe = $('<iframe />');

			closeButton.css({
				float : 'right',
				clear : 'both',
				margin : '5px'
			});

			iframe.attr('src', 'todo');
			iframe.addClass('todo');

			closeButton.html('Close');
			container.append( iframe )
					 .append( closeButton );


			tab = tabsMan.add( 'About', container, true );

			closeButton.on('click', function() {
				tabsMan.remove( tab.id );
			});

		}
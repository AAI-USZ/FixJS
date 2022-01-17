function( evt ) {

			var panel,
				self = this,
				panman = self.sandbox.panelsManager,
				container = $('<div />'),
				closeButton = $('<button />'),
				iframe = $('<iframe />');

			closeButton.css({
				float : 'right',
				clear : 'both',
				margin : '5px'
			});

			iframe.attr('src', 'todo');
			iframe.css({
				width : '640px',
				height : '480px',
				display : 'block',
			});

			closeButton.html('Close');
			container.append( iframe )
					 .append( closeButton );

			panel = new Panel({ content : container, title : 'About' });
			panman.add( panel );
			panman.center( panel );
			panman.modal( panel );

			closeButton.on('click', function() {
				panman.remove( panel );
			});

		}
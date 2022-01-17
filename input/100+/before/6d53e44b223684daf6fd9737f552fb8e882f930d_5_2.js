function( Module, Panel ) {
	
	var TodoMod = Module.$extend({

		start : function( opts ) {
			var self = this;
			opts = opts || {};

			self._link = opts.link;

			self._onLinkClickBinded = self._onLinkClick.bind( self );
			self._initEventHandlers();

		},

		_initEventHandlers : function() {
			var self = this,
				link = $(self._link);
			link.on('click', self._onLinkClickBinded );
		},

		_onLinkClick : function( evt ) {

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



	});

	return TodoMod;

}
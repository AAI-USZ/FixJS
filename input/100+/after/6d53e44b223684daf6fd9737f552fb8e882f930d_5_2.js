function( Module ) {
	
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



	});

	return TodoMod;

}
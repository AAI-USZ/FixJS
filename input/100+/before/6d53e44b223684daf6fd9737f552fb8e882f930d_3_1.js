function( opts ) {

			opts = opts || {};

			var self = this;

			self._container = $(opts.container);

			//self._initLayout();
			self._initEventHandlers();

			return {
				add : self._add.bind( self ),
				remove : self._remove.bind( self ) 
			};

		}
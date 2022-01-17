function( event ) {
				var index = $( this ).data( "index.ui-slider-handle" );

				if ( self._keySliding ) {
					self._keySliding = false;
					self._stop( event, index );
					self._change( event, index );
					$( this ).removeClass( "ui-state-active" );
				}

			}
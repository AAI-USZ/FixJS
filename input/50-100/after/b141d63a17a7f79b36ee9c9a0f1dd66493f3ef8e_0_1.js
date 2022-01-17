function( event ) {
				var index = $( this ).data( "ui-slider-handle-index" );

				if ( self._keySliding ) {
					self._keySliding = false;
					self._stop( event, index );
					self._change( event, index );
					$( this ).removeClass( "ui-state-active" );
				}

			}
function( textStatus, response ) {
			// remove and show immediately since we need nodes for the tooltip!
			self._subject.removeClass( self.UI_CLASS + '-waiting' );
			waitMsg.remove();
			self.enable(); // re-enabling actions and input box when saving has failed
			self._toolbar._elem.show();
			self._apiCallErr( textStatus, response, apiAction );
		}
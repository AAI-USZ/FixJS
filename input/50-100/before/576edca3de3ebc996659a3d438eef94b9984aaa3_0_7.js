function( event ){			
		if( MouseLocationDetector.onRightBoundary( event, this ) ){
			event.preventDefault();
			oDynamicTable.oColumnHandleData = {
					oElement: 			this,
					iLastXCoordinate:	event.pageX
			};
		}
	}
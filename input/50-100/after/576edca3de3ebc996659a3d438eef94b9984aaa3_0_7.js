function( event ){			
		if( MouseLocationDetector.onRightBoundary( event, this ) ){
			event.preventDefault();
			oDynamicTable.oColumnHandleData = {
					oElement: 			this,
					iStartXCoordinate:	event.pageX,
					iStartWidth:		$(this).width()
			};
		}
	}
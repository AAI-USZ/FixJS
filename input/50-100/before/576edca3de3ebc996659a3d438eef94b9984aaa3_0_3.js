function( event ){	
		sBoundaries = MouseLocationDetector.getCoveredBoundaries(event, this);
		
		if( sBoundaries != null ){
			event.preventDefault();
			oDynamicTable.oTableResizeHandleData = {
					sBoundaries: sBoundaries,
					iLastCoordinate:	{
						x: event.pageX,
						y: event.pageY
					}
			};
		}
	}
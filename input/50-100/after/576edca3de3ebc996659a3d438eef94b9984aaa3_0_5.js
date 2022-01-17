function( event ){	
		sBoundaries = MouseLocationDetector.getCoveredBoundaries(event, this);
		
		if( sBoundaries != null && sBoundaries == 'n' ){
			event.preventDefault();
			oDynamicTable.oTableDragHandleData = {
					oStartCoordinate:	{
						x: event.pageX,
						y: event.pageY
					}
			};
		}
	}
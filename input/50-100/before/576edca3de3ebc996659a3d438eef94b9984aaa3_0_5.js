function( event ){	
		sBoundaries = MouseLocationDetector.getCoveredBoundaries(event, this);
		
		if( sBoundaries != null && sBoundaries == 'n' ){
			event.preventDefault();
			oDynamicTable.oTableDragHandleData = {
					iLastCoordinate:	{
						x: event.pageX,
						y: event.pageY
					}
			};
		}
	}
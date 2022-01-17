function( event ){	
		sBoundaries = MouseLocationDetector.getCoveredBoundaries(event, this);
		
		if( sBoundaries != null ){
			event.preventDefault();
			oDynamicTable.oTableResizeHandleData = {
					sBoundaries: sBoundaries,
					oStartCoordinate:	{
						x: event.pageX,
						y: event.pageY
					},
					oStartSize:	{
						iWidth: oDynamicTable.oTableElement.width(),
						iHeight: oDynamicTable.oTableElement.height() 
					}
			};
		}
	}
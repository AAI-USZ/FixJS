function( event ){
		var sCursorStyle = 'default';

		if( oDynamicTable.oTableDragHandleData ){
			//if the tableHandle is in the process 
			//	of moving, don't bother changing the cursor
			return; 
		}
		
		//returns one of ( n, ne, e, se, s, sw, w, nw )
		sBoundaryLocation = MouseLocationDetector.getCoveredBoundaries(event, this);
		
		//only allowing resizing from east and/or south borders to start with
		if( sBoundaryLocation != null && sBoundaryLocation.indexOf('n') != -1 ){
			sCursorStyle = 'move';
		}
		
		jQuery('body').css('cursor', sCursorStyle );
	}
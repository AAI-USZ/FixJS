function(event) {
        var orientation = jQuery(this).attr('orientation');
        amount = 0;
        if (event.charCode == 48) { // reset zoom
          //context.setBrightness(0);
          //context.setContrast(0);
            context.zoomFactor = 1.0;
        }
        if (event.charCode == 43 && !event.metaKey ) { // increase the zoom factor
          context.zoomFactor = context.zoomFactor * 1.1;
        }
        if (event.charCode == 45 && !event.metaKey ) { // decrease the zoom factor (should not become 0)
            context.zoomFactor = context.zoomFactor * 0.9;
        }
	if (event.charCode == 32 || event.keyCode == 32) { // toggle display of overlay information
	    context.infoOverlayEnabled = !context.infoOverlayEnabled;
	}
        if (event.charCode == 104 || event.keyCode == 104) { // 'H'
          // find the windowArray entry and change its orientation
	  for (var id in context.windowArray) {
                     var obj = jQuery(id).attr('id');
                     if ( obj === jQuery(event.currentTarget).attr('id') ) {
                        context.windowArray[id] = [0,0,1];
                        jQuery(this).attr('orientation',[0,0,1]);
                     }
                  }
               }
               if (event.charCode == 99 || event.keyCode == 99) { // 'C'
                 // find the windowArray entry and change its orientation
		 for (var id in context.windowArray) {
                     var obj = jQuery(id).attr('id');
                     if ( obj === jQuery(event.currentTarget).attr('id') ) {
                        context.windowArray[id] = [1,0,0];
                        jQuery(this).attr('orientation',[1,0,0]);
                     }
                  }
               }
               if (event.charCode == 114 || event.keyCode == 114) { // 'R'
                 // find the windowArray entry and change its orientation
		 for (var id in context.windowArray) {
                     var obj = jQuery(id).attr('id');
                     if ( obj === jQuery(event.currentTarget).attr('id') ) {
                        context.windowArray[id] = [0,1,0];
                        jQuery(this).attr('orientation',[0,1,0]);
                     }
                  }
               }
               if (event.keyCode == 38 || event.keyCode == 39)
                  amount = 1;
           if (event.keyCode == 40 || event.keyCode == 37)
          amount = -1;
           
               if ( orientation == "0,0,1" ) {
                  if (!context.lockPosition[0])
                    context.position[0]+=amount;
               }
               if ( orientation == "0,1,0" ) {
                  if (!context.lockPosition[1])
                    context.position[1]+=amount;
               }
               if ( orientation == "1,0,0" ) {
                  if (!context.lockPosition[2])
                    context.position[2]+=amount;
               }
               // normalize the position
               for (var i = 0; i < 3; i++) {
                  if (context.position[i] < 0)
                     context.position[i] = 0;
                  if (context.position[i] > context.getDims()[i]-1)
                     context.position[i] = context.getDims()[i]-1;
               }
               new importImages( context.dataPath, context.updateDataStore, context, context.position, true );
               if (context.overlayDataIsSet)
                 new importImages( context.overlayDataPath, context.updateDataStore, context, context.position, false );
      }
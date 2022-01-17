function( id, orientation ) {
    this.windowArray[id] = orientation;
    jQuery(''+id).attr('orientation', orientation);
    
    // make the canvas editable and therfore able to receive keyboard input
    jQuery(id).attr('contentEditable', 'true');
    if ( jQuery(id).get(0) )
      jQuery(id).get(0).contentEditable = true;
    
    // add a custom event to update the display
    jQuery(this).bind("updateImages", function() {
	this.update();
    });
    
    jQuery(id).mousedown( (function(context) { return function(event) { 
	context.isMouseDown = true;
        canvasLocation = findPos(this);
	context.mousePos1 = [event.pageX - canvasLocation[0], 
			     event.pageY - canvasLocation[1]];
	context.startBrightnessContrast = [ context.getBrightness(), context.getContrast() ];
	for (var i = 0; i < 6; i++) {
	  context.translate[i] = 0;
	}
    } })(this) );
    jQuery(id).mouseup( (function(context) { return function(event) {
	context.isMouseDown = false; 
	for (var i = 0; i < 6; i++) {
	  context.startTranslate[i] += context.translate[i];
          context.translate[i] = 0;
	}
    } })(this) );
    jQuery(id).mousemove( (function(context) {
	return function(event) {
          if (!context.isMouseDown)
            return; // ignore this event

          var normalID = jQuery(id).attr('id');         
          var width  = document.getElementById(normalID).width;
          var height = document.getElementById(normalID).height;
          var orientation = jQuery(this).attr('orientation');
          canvasLocation = findPos(this);
	  if (event.shiftKey) {
              var b = (context.mousePos1[0] - (event.pageX - canvasLocation[0] /*this.offsetLeft*/))/width*150.0;
	      var c = (context.mousePos1[1] - (event.pageY - canvasLocation[1] /*this.offsetTop*/))/height*1.0;
	      // adjust brightness and contrast
	      var startB = context.startBrightnessContrast[0];
	      var startC = context.startBrightnessContrast[1];
	      context.setBrightness( startB + b );
	      context.setContrast( startC + c );
	      context.update(); // redraw the images
	      return;
          }
	  var transSet = 0;
	  if (orientation == "0,1,0") {
            transSet = 1;
          }
	  if (orientation == "1,0,0") {
            transSet = 2;
	  }

          if (event.metaKey || event.ctrlKey) { // should be ctrlKey on Windows
            var b = - (context.mousePos1[0] - (event.pageX - canvasLocation[0]));
            var c = - (context.mousePos1[1] - (event.pageY - canvasLocation[1]));
            context.translate[transSet*2+0] = b;
            context.translate[transSet*2+1] = c;
            context.update();
            return;
	  }

          var x = event.pageX - canvasLocation[0] /*this.offsetLeft*/;
          var y = event.pageY - canvasLocation[1] /*this.offsetTop*/;
          // map the location on the canvas to image dimension
	  // this is without zoom yet
	  
          if ( orientation == "0,0,1" ) {
              x = Math.round(x/width *  (context.getDims()[1]-1));
	      y = Math.round(y/height * (context.getDims()[2]-1));
	      if (!context.lockPosition[1])
		context.position[1] = x;
	      if (!context.lockPosition[2])
		context.position[2] = y;
          } else if ( orientation == "0,1,0" ) {
	      x = Math.round(x/width *  (context.getDims()[2]-1));
	      y = Math.round(y/height * (context.getDims()[0]-1));
	      if (!context.lockPosition[0])
		context.position[0] = /*255- */y;
	      if (!context.lockPosition[2])
		context.position[2] = x;
          } else /*if ( orientation == "1,0,0" )*/ {
              x = Math.round(x/width *  (context.getDims()[1]-1));
	      y = Math.round(y/height * (context.getDims()[0]-1));
	      if (!context.lockPosition[0])
		context.position[0] = /*255- */y;
	      if (!context.lockPosition[1])
		context.position[1] = x;
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
   })(this));

   jQuery(id).click((function(context) {
      return function(event) {
        if (event.shiftKey || event.metaKey || event.ctrlKey) // don't move the point if the user is changing brightness/contrast
	  return;
        var normalID = jQuery(id).attr('id');
        var width  = document.getElementById(normalID).width;
        var height = document.getElementById(normalID).height;
        var orientation = jQuery(this).attr('orientation');
        canvasLocation  = findPos(this);

        var x = event.pageX - canvasLocation[0]; // this.offsetLeft;
        var y = event.pageY - canvasLocation[1]; // this.offsetTop; // in canvas space

	var oldxy  = context.lastCrossHairLocationImageSpace;
        var oldpos = context.position;
        var zoom   = context.zoomFactor;
        var offset = [x-oldxy[0], y-oldxy[1]];

	// map to image space
        if ( orientation == "0,0,1" ) {
         //x -= context.startTranslate[0];
         //y -= context.startTranslate[1];
         //x = Math.round(x/width  * (context.getDims()[1]-1));
         //y = Math.round(y/height * (context.getDims()[2]-1));
             var offset = [x-oldxy[0], y-oldxy[1]];
             offset[0] = offset[0]/width * (context.getDims()[1]-1);
             offset[1] = offset[1]/height * (context.getDims()[2]-1);
	     x = Math.round(oldpos[1]+(offset[0]/zoom));
	     y = Math.round(oldpos[2]+(offset[1]/zoom));
	     if (!context.lockPosition[1])
               context.position[1] = x;
	     if (!context.lockPosition[2])
               context.position[2] = y;
        }
        if ( orientation == "0,1,0" ) {
         //x -= context.startTranslate[2];
         //y -= context.startTranslate[3];
         //x = Math.round(x/width * (context.getDims()[2]-1));
         //y = Math.round(y/height* (context.getDims()[0]-1));
             var offset = [x-oldxy[2], y-oldxy[3]];
             offset[0] = offset[0]/width * (context.getDims()[2]-1);
             offset[1] = offset[1]/height * (context.getDims()[0]-1);
	     x = Math.round(oldpos[2]+(offset[0]/zoom));
	     y = Math.round(oldpos[0]+(offset[1]/zoom));
	     if (!context.lockPosition[0])
	       context.position[0] = y;
	     if (!context.lockPosition[2])
               context.position[2] = x;
         }
         if ( orientation == "1,0,0" ) {
         //x -= context.startTranslate[4];
         //y -= context.startTranslate[5];
         //x = Math.round(x/width * (context.getDims()[1]-1));
         //y = Math.round(y/height* (context.getDims()[0]-1));
             var offset = [x-oldxy[4], y-oldxy[5]];
             offset[0] = offset[0]/width * (context.getDims()[1]-1);
             offset[1] = offset[1]/height * (context.getDims()[0]-1);
         x = Math.round(oldpos[1]+(offset[0]/zoom));
         y = Math.round(oldpos[0]+(offset[1]/zoom));
         if (!context.lockPosition[0])
         context.position[0] = y;
         if (!context.lockPosition[1])
         context.position[1] = x;
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
   })(this));
if (typeof jQuery(id).mousewheel == 'function') {  
     jQuery(id).mousewheel((function(context) {
	 return function(event, delta) {
           event.preventDefault();
         var orientation = jQuery(this).attr('orientation');
	 var amount = Math.round(delta/0.3333);
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
     })(this));
   }
   jQuery(id).keydown((function(context) {
      return function(event) {
         if (event.keyCode == 49) {
            if (context.oldAlpha < 0) // set the old alpha only the first time the key is pressed
               context.oldAlpha = context.getOverlayAlpha();
            context.setOverlayAlpha(0);
         }
         if (event.keyCode == 50) {
            if (context.oldAlpha < 0){
               context.oldAlpha = context.getOverlayAlpha();
               context.setOverlayAlpha(1);
            }
         }
      };
   })(this));
   jQuery(id).keyup((function(context) {
      return function(event) {
         if (event.keyCode == 49) {
           context.setOverlayAlpha(context.oldAlpha);
           context.oldAlpha = -1;  // reset to not set again
         }
         if (event.keyCode == 50) {
           context.setOverlayAlpha(context.oldAlpha);
           context.oldAlpha = -1;
         }
      };
   })(this));
   jQuery(id).keypress((function(context) {
      return function(event) {
        var orientation = jQuery(this).attr('orientation');
        amount = 0;
        if (event.charCode == 48) { // reset zoom
          //context.setBrightness(0);
          //context.setContrast(0);
	  context.startTranslate = [0,0,0,0,0,0];
	  context.translate      = [0,0,0,0,0,0];
          context.zoomFactor     = 1.0;
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
   })(this));
}
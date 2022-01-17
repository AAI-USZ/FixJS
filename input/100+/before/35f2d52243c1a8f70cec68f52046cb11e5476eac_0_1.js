function(context) {
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
   }
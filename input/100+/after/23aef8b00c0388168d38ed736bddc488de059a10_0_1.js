function(activityId, options) {
      
      for(var i = 0 ; i < this.config.events.length ; i++) {
         var evt = this.config.events[i];
         
         if ( evt.eventType == "ActivityTaskCompleted") {
            if( this.activityIdFor(evt.activityTaskCompletedEventAttributes.scheduledEventId) == activityId ) {
               
               var result = evt.activityTaskCompletedEventAttributes.result;
               
               if(!!options && !!options.format && options.format == "json") {
                  result = JSON.parse(result);
               }
               
               return result;
            }
         }
      }
      
      return null;
   }
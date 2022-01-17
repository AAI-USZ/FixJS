f
        // Check to make sure the event type collection
        // currently exists.
        if (!(this.subscriptions.hasOwnProperty(eventType)) || 
            !this.subscriptions[ eventType ].length ){

            // Return out - if there's no subscriber
            // collection for this event type, there's
            // nothing for us to unbind.
            return;
        }

        // Map the current subscription collection to a new
        // one that doesn't have the given callback.
        //this.subscriptions[ eventType ] = $.map(
        //this.subscriptions[ eventType ], function( subscription ){
               $.each(this.subscriptions[ eventType ], 
        function( index, subscription ){ 
            // Check to see if this callback matches the
            // one we are unsubscribing. If it does, we
            // are going to want to remove it from the
            // collection.
            if (subscription.callback === callback){

                // Return null to remove this matching
                // callback from the subsribers.
                return( null );

            } else {

                // Return the given subscription to keep
                // it in the subscribers collection.
                //return( subscription );
                
                var event = {
                      type: eventType,
                      result: null
                    };
                event.result = subscription.callback.apply(subscription.subscriber);
                return( event.result );
            }
        });
    };

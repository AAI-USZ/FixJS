function(newStatus){
            this._status = newStatus;
            
            // publish /app/stauts event.
            // application can subscribe this event to do some status change operation.
            topic.publish("/app/status", [newStatus]);
        }
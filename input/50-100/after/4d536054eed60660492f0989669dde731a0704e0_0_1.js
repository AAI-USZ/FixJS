function(err, result) {
         
         if(err) {
            console.log("RespondDecisionTaskCompleted error", err, result);
            if(cb) {
               cb(err, null);
               return;
            }
         }
         
         if(cb) {
            cb(null, result);
         }
         
      }
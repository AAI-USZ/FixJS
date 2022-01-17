function(err, result) {
         
         if(err) {
            console.log(_this.config.identity+": RespondDecisionTaskCompleted error", err, result);
         }
         
         if(cb) cb();
         
      }
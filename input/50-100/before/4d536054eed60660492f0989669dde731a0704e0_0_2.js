function(decisions, cb) {
      
      var _this = this;
      
      console.log(_this.config.identity+": RespondDecisionTaskCompleted... ");
      
      this.swfClient.RespondDecisionTaskCompleted({
        "taskToken": _this.config.taskToken,
        "decisions": decisions
      }, function(err, result) {
         
         if(err) {
            console.log(_this.config.identity+": RespondDecisionTaskCompleted error", err, result);
         }
         
         if(cb) cb();
         
      });
      
   }
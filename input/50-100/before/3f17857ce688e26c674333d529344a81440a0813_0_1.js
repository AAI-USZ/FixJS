function(res){
         var res = res ? res : matchArgs(),scope = this,
         interval= function(res){
            run_command(res.c_dir,res.command);
         };

         var runner = setInterval(function(){
            interval.call(scope,res);
         },res.timeout);
      }
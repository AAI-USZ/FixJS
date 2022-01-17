function(res){
         var res = res ? res : matchArgs(),scope = this,
         interval= function(res){
            run_command(res.c_dir,res.command);
         };
		
		 console.log("Running: '",res.command,"' every",res.timeout,"second!");
         var runner = setInterval(function(){
            interval.call(scope,res);
         },res.timeout);
      }
function(e,out,err){
         if(e){
            console.log('\033[31m');
            process.stdout.write(" - ");
         }
            process.stdout.write(" + ");
      }
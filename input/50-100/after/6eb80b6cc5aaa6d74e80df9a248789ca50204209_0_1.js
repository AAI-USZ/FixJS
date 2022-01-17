function(e,out,err){
         if(e){
            process.stdout.write('\033[31m');
            process.stdout.write(" - ");
            process.stdout.write(e.message);
         }
            process.stdout.write('\033[34m');
            process.stdout.write(" + ");
            process.stdout.write('\033[0m');
      }
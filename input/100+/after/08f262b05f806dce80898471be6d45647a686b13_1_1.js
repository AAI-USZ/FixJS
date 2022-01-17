function(err, result) { 
      if(err) {        
        console.log('\n' + err);
        process.exit(1);
      } 
      if(result) {
        process.exit(0); 
      }
    }
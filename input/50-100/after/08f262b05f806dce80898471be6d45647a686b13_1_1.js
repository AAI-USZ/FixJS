function(err, response) {
      if(err) {
        console.log('\n' + err);
        process.exit(1); 
      } 
      console.log('\nValue for key ' + key + ' = ' +response);
      process.exit(0);
    }
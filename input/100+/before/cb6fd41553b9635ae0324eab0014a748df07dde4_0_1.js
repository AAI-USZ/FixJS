function(err, file) {
      if (err) return res.send(500);
      
      console.log('file opened');
      
      console.log(file.contentType);
      res.contentType(file.contentType);
      
      var stream = file.stream(true);
      
      stream.on('data', function(chunk) { 
        console.log('sending chunk');
        res.write(chunk); 
      });
      stream.on('end', function() {
        console.log('sending end');
        res.end(); 
      });
      stream.on('close', function() {
        console.log('close');
      })
    }
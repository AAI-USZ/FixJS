function(err , doc){
        if (err){
          throw err;
        }
        else{
          var token = generateAuthToken;
          res.send({'status' : ok , 'data' : doc}); 
        }
      }
function(err , doc){
        if (err){
          throw err;
        }
        else{
          var token = generateAuthToken(manufacturerId);
          doc.authToken = token;
          res.send({'status' : ok , 'data' : doc}); 
        }
      }
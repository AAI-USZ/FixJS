function(){
      delete req.headers['x-forwarded-proto'];
      req.protocol = 'http';
      req.connection.encrypted = false;

      res.redirect = function(url){
        throw Error('Redirection to '+url);
      };
    }